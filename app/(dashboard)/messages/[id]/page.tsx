"use client";

import { use, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import PageHeader from "@/Components/dashboard/Layout/PageHeader";
import { CalendarIcon } from "@/Components/dashboard/Layout/icons";
import StatusBadge, { type MessageStatus } from "@/Components/dashboard/Message/StatusBadge";
import ActionButton, { actionButtonClass } from "@/Components/dashboard/shared/ActionButton";
import ConfirmDialog from "@/Components/dashboard/shared/ConfirmDialog";
import FormDialog from "@/Components/dashboard/shared/FormDialog";
import { Field, SelectInput, TextArea, TextInput } from "@/Components/dashboard/shared/fields";
import InfoTile from "@/Components/dashboard/shared/InfoTile";
import SettingsCard from "@/Components/dashboard/shared/SettingsCard";
import { ArrowLeftIcon, CheckIcon, TrashIcon } from "@/Components/dashboard/shared/icons";
import { deleteContactMessage, getContactMessage, updateContactMessage, type ContactStatus } from "@/lib/api";
import { formatDate, timeAgo } from "@/lib/format";
import { useAction, useApi, useSessionGuard } from "@/lib/useApi";

/** One contact message, built from the dashboard's existing cards. Opening it marks a new message as read. */
export default function MessagePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const onError = useSessionGuard();
  const { data: message, reload } = useApi(() => getContactMessage(id), id);
  const action = useAction(reload);

  useEffect(() => {
    if (message?.status === "NEW") {
      updateContactMessage(message.id, "READ").then(reload, onError);
    }
  }, [message, reload, onError]);

  if (!message) return null;

  const respondedAction = action(() => updateContactMessage(message.id, "RESPONDED"));
  const editAction = action((formData) => {
    const text = (field: string) => String(formData.get(field) ?? "");
    return updateContactMessage(message.id, {
      name: text("name"),
      email: text("email"),
      organization: text("organization"),
      jobTitle: text("jobTitle"),
      phone: text("phone"),
      service: text("service"),
      program: text("program"),
      message: text("message"),
      status: text("status") as ContactStatus,
    });
  });
  const deleteAction = async () => {
    try {
      await deleteContactMessage(message.id);
      router.replace("/messages");
    } catch (error) {
      onError(error);
      window.alert(error instanceof Error ? error.message : "Something went wrong. Please try again.");
    }
  };

  const details = [
    ["Email", <a key="email" href={`mailto:${message.email}`} className="font-medium text-blue-sovereign hover:text-blue-pulse">{message.email}</a>],
    ["Organization", message.organization],
    ["Job title", message.jobTitle],
    ["Phone", message.phone],
    ["Area of interest", message.service],
    ["Program", message.program],
  ] as const;

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Inbox"
        title={message.name}
        description={message.email}
        actions={
          <>
            <Link href="/messages" className={actionButtonClass("light")}>
              <ArrowLeftIcon />
              All messages
            </Link>
            <div>
              <FormDialog triggerLabel="Edit message" title="Edit message" action={editAction}>
                <div className="grid gap-3 sm:grid-cols-2">
                  <Field label="Name">
                    <TextInput name="name" required defaultValue={message.name} />
                  </Field>
                  <Field label="Email">
                    <TextInput name="email" type="email" required defaultValue={message.email} />
                  </Field>
                  <Field label="Organization">
                    <TextInput name="organization" defaultValue={message.organization ?? ""} />
                  </Field>
                  <Field label="Job title">
                    <TextInput name="jobTitle" defaultValue={message.jobTitle ?? ""} />
                  </Field>
                  <Field label="Phone">
                    <TextInput name="phone" defaultValue={message.phone ?? ""} />
                  </Field>
                  <Field label="Area of interest">
                    <TextInput name="service" defaultValue={message.service ?? ""} />
                  </Field>
                  <Field label="Program">
                    <TextInput name="program" defaultValue={message.program ?? ""} />
                  </Field>
                  <Field label="Status">
                    <SelectInput name="status" defaultValue={message.status}>
                      <option value="NEW">New</option>
                      <option value="READ">Read</option>
                      <option value="RESPONDED">Responded</option>
                    </SelectInput>
                  </Field>
                </div>
                <Field label="Message">
                  <TextArea name="message" required rows={6} defaultValue={message.message} />
                </Field>
              </FormDialog>
            </div>
          </>
        }
      />

      <div className="grid items-start gap-4 lg:grid-cols-[1.7fr_1fr]">
        <SettingsCard title="Message" description={`Received ${timeAgo(message.createdAt)}`}>
          <p className="whitespace-pre-wrap px-5 pb-5 pt-4 text-sm leading-relaxed text-ink-900">{message.message}</p>
        </SettingsCard>

        <SettingsCard title="Details" description="Sent from the website contact form.">
          <div className="space-y-4 px-5 pb-5 pt-4">
            <StatusBadge status={message.status.toLowerCase() as MessageStatus} />

            <dl className="space-y-3">
              {details.map(([label, value]) =>
                value ? (
                  <div key={label}>
                    <dt className="text-[10px] font-semibold uppercase tracking-wider text-ink-500">{label}</dt>
                    <dd className="mt-1 text-sm text-ink-900">{value}</dd>
                  </div>
                ) : null,
              )}
            </dl>

            <InfoTile icon={<CalendarIcon width={14} height={14} />} label="Received" value={formatDate(message.createdAt)} />

            <div className="flex items-center justify-between gap-2 border-t border-ink-100 pt-3">
              {message.status !== "RESPONDED" ? (
                <form action={respondedAction}>
                  <ActionButton type="submit" variant="dark" icon={<CheckIcon />}>
                    Mark as responded
                  </ActionButton>
                </form>
              ) : (
                <span />
              )}
              <ConfirmDialog
                triggerLabel={`Delete ${message.name}'s message`}
                triggerIcon={<TrashIcon />}
                triggerStyle="icon-danger"
                title="Delete this message?"
                description="This permanently removes the message and can't be undone."
                confirmLabel="Delete"
                tone="danger"
                action={deleteAction}
              />
            </div>
          </div>
        </SettingsCard>
      </div>
    </div>
  );
}

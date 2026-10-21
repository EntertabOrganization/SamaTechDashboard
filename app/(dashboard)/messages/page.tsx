import PageHeader from "@/Components/dashboard/Layout/PageHeader";
import MessageFilters from "@/Components/dashboard/Message/MessageFilters";
import MessageList from "@/Components/dashboard/Message/MessageList";
import MessageRow from "@/Components/dashboard/Message/MessageRow";

export default function MessagesPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Inbox"
        title="Contact messages"
        description="Messages sent from the website contact form."
      />

      {/* TODO(backend): pass activeStatus and query from the URL (?status=&q=) */}
      <MessageFilters activeStatus="all" />

      <MessageList>
        {/* TODO(backend): replace these two placeholder rows with messages.map(...) */}
        <MessageRow
          href="#"
          name="Sender name"
          email="name@organization.com"
          organization="Organization"
          jobTitle="Job title"
          area="Area of interest"
          preview="The first lines of the message appear here, up to two lines, then they are cut."
          receivedAt="Received"
          status="new"
        />
        <MessageRow
          href="#"
          name="Sender name"
          email="name@organization.com"
          organization="Organization"
          jobTitle="Job title"
          area="Area of interest"
          preview="The first lines of the message appear here, up to two lines, then they are cut."
          receivedAt="Received"
          status="read"
        />
      </MessageList>
    </div>
  );
}

import PageHeader from "@/Components/dashboard/Layout/PageHeader";
import ContentAreaCard from "@/Components/dashboard/content/ContentAreaCard";
import ContentTabs from "@/Components/dashboard/content/ContentTabs";
import {
  BriefcaseIcon,
  HomeIcon,
  MailIcon,
  SearchIcon,
  SettingsIcon,
  UsersIcon,
} from "@/Components/dashboard/content/icons";

export default function ContentPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Website"
        title="Content"
        description="Edit what visitors read on the website. Pick a page or a global setting."
      />
      <ContentTabs active="pages" />

      <section aria-labelledby="pages-heading" className="space-y-3">
        <h2
          id="pages-heading"
          className="text-[10px] font-semibold uppercase tracking-wider text-ink-500"
        >
          Pages
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <ContentAreaCard
            href="/content/home"
            icon={<HomeIcon />}
            title="Homepage"
            description="Hero, pillars intro, who we serve, why Samatechs, track record and FAQ."
          />
          <ContentAreaCard
            href="/content/services"
            icon={<BriefcaseIcon />}
            title="Services"
            description="The services page, how we work, and the three pillars."
          />
          <ContentAreaCard
            href="/content/about"
            icon={<UsersIcon />}
            title="About"
            description="Who we are, mission and vision, differentiators and founders."
          />
          <ContentAreaCard
            href="/content/settings"
            icon={<MailIcon />}
            title="Contact"
            description="The contact details come from Site settings."
          />
        </div>
      </section>

      <section aria-labelledby="global-heading" className="space-y-3">
        <h2
          id="global-heading"
          className="text-[10px] font-semibold uppercase tracking-wider text-ink-500"
        >
          Global
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <ContentAreaCard
            href="/content/seo"
            icon={<SearchIcon />}
            title="SEO"
            description="Titles, descriptions and social images for every page."
          />
          <ContentAreaCard
            href="/content/settings"
            icon={<SettingsIcon />}
            title="Site settings"
            description="Name, logos, contact details, social links and footer."
          />
        </div>
      </section>
    </div>
  );
}

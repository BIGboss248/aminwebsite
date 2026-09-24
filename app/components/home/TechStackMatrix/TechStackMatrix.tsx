import React from "react";
import { useTranslations } from "next-intl";
import {
  LayoutGrid,
  Server,
  Cloud,
  ShieldCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SkillBadge } from "./SkillBadge";
import type {
  TechStackMatrixProps,
  TechDomain,
} from "./TechStackMatrix.types";

/**
 * Competencies & Systems Tech Matrix Section.
 *
 * Articulates full-stack systems engineering competencies across 4 high-cohesion
 * architectural domains: Frontend/SSR, Distributed Systems/Backend, Cloud/DevOps,
 * and Security/Protocols.
 *
 * @param props - Configuration properties for the TechStackMatrix.
 * @returns A React Server Component rendering the 4-quadrant Bento Matrix.
 */
export function TechStackMatrix({
  locale: _locale = "en",
  className = "",
}: TechStackMatrixProps): React.JSX.Element {
  const t = useTranslations("home.tech_matrix");

  const domains: TechDomain[] = [
    {
      id: "frontend",
      titleKey: "domain_frontend_title",
      summaryKey: "domain_frontend_summary",
      badgeCountKey: "domain_frontend_badge_count",
      icon: LayoutGrid,
      accentColor: "cyan",
      skills: [
        {
          id: "nextjs",
          nameKey: "skill_nextjs_name",
          tagKey: "skill_nextjs_tag",
          expKey: "skill_nextjs_exp",
          usecaseKey: "skill_nextjs_usecase",
          iconName: "nextjs",
          domain: "frontend",
        },
        {
          id: "typescript",
          nameKey: "skill_typescript_name",
          tagKey: "skill_typescript_tag",
          expKey: "skill_typescript_exp",
          usecaseKey: "skill_typescript_usecase",
          iconName: "typescript",
          domain: "frontend",
        },
        {
          id: "react",
          nameKey: "skill_react_name",
          tagKey: "skill_react_tag",
          expKey: "skill_react_exp",
          usecaseKey: "skill_react_usecase",
          iconName: "react",
          domain: "frontend",
        },
        {
          id: "tailwind",
          nameKey: "skill_tailwind_name",
          tagKey: "skill_tailwind_tag",
          expKey: "skill_tailwind_exp",
          usecaseKey: "skill_tailwind_usecase",
          iconName: "tailwind",
          domain: "frontend",
        },
        {
          id: "framer",
          nameKey: "skill_framer_name",
          tagKey: "skill_framer_tag",
          expKey: "skill_framer_exp",
          usecaseKey: "skill_framer_usecase",
          iconName: "framer",
          domain: "frontend",
        },
      ],
    },
    {
      id: "systems",
      titleKey: "domain_systems_title",
      summaryKey: "domain_systems_summary",
      badgeCountKey: "domain_systems_badge_count",
      icon: Server,
      accentColor: "violet",
      skills: [
        {
          id: "go",
          nameKey: "skill_go_name",
          tagKey: "skill_go_tag",
          expKey: "skill_go_exp",
          usecaseKey: "skill_go_usecase",
          iconName: "go",
          domain: "systems",
        },
        {
          id: "python",
          nameKey: "skill_python_name",
          tagKey: "skill_python_tag",
          expKey: "skill_python_exp",
          usecaseKey: "skill_python_usecase",
          iconName: "python",
          domain: "systems",
        },
        {
          id: "postgres",
          nameKey: "skill_postgres_name",
          tagKey: "skill_postgres_tag",
          expKey: "skill_postgres_exp",
          usecaseKey: "skill_postgres_usecase",
          iconName: "postgres",
          domain: "systems",
        },
        {
          id: "redis",
          nameKey: "skill_redis_name",
          tagKey: "skill_redis_tag",
          expKey: "skill_redis_exp",
          usecaseKey: "skill_redis_usecase",
          iconName: "redis",
          domain: "systems",
        },
        {
          id: "grpc",
          nameKey: "skill_grpc_name",
          tagKey: "skill_grpc_tag",
          expKey: "skill_grpc_exp",
          usecaseKey: "skill_grpc_usecase",
          iconName: "grpc",
          domain: "systems",
        },
        {
          id: "nodejs",
          nameKey: "skill_nodejs_name",
          tagKey: "skill_nodejs_tag",
          expKey: "skill_nodejs_exp",
          usecaseKey: "skill_nodejs_usecase",
          iconName: "nodejs",
          domain: "systems",
        },
      ],
    },
    {
      id: "devops",
      titleKey: "domain_devops_title",
      summaryKey: "domain_devops_summary",
      badgeCountKey: "domain_devops_badge_count",
      icon: Cloud,
      accentColor: "emerald",
      skills: [
        {
          id: "docker",
          nameKey: "skill_docker_name",
          tagKey: "skill_docker_tag",
          expKey: "skill_docker_exp",
          usecaseKey: "skill_docker_usecase",
          iconName: "docker",
          domain: "devops",
        },
        {
          id: "kubernetes",
          nameKey: "skill_kubernetes_name",
          tagKey: "skill_kubernetes_tag",
          expKey: "skill_kubernetes_exp",
          usecaseKey: "skill_kubernetes_usecase",
          iconName: "kubernetes",
          domain: "devops",
        },
        {
          id: "github_actions",
          nameKey: "skill_github_actions_name",
          tagKey: "skill_github_actions_tag",
          expKey: "skill_github_actions_exp",
          usecaseKey: "skill_github_actions_usecase",
          iconName: "github_actions",
          domain: "devops",
        },
        {
          id: "linux",
          nameKey: "skill_linux_name",
          tagKey: "skill_linux_tag",
          expKey: "skill_linux_exp",
          usecaseKey: "skill_linux_usecase",
          iconName: "linux",
          domain: "devops",
        },
        {
          id: "nginx",
          nameKey: "skill_nginx_name",
          tagKey: "skill_nginx_tag",
          expKey: "skill_nginx_exp",
          usecaseKey: "skill_nginx_usecase",
          iconName: "nginx",
          domain: "devops",
        },
      ],
    },
    {
      id: "security",
      titleKey: "domain_security_title",
      summaryKey: "domain_security_summary",
      badgeCountKey: "domain_security_badge_count",
      icon: ShieldCheck,
      accentColor: "amber",
      skills: [
        {
          id: "doh",
          nameKey: "skill_doh_name",
          tagKey: "skill_doh_tag",
          expKey: "skill_doh_exp",
          usecaseKey: "skill_doh_usecase",
          iconName: "doh",
          domain: "security",
        },
        {
          id: "tls",
          nameKey: "skill_tls_name",
          tagKey: "skill_tls_tag",
          expKey: "skill_tls_exp",
          usecaseKey: "skill_tls_usecase",
          iconName: "tls",
          domain: "security",
        },
        {
          id: "stun",
          nameKey: "skill_stun_name",
          tagKey: "skill_stun_tag",
          expKey: "skill_stun_exp",
          usecaseKey: "skill_stun_usecase",
          iconName: "stun",
          domain: "security",
        },
        {
          id: "entropy",
          nameKey: "skill_entropy_name",
          tagKey: "skill_entropy_tag",
          expKey: "skill_entropy_exp",
          usecaseKey: "skill_entropy_usecase",
          iconName: "entropy",
          domain: "security",
        },
      ],
    },
  ];

  const domainAccentStyles = {
    cyan: {
      iconContainer: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20",
      badgePill: "bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border-cyan-500/20",
      cardHover: "hover:border-cyan-500/30",
    },
    violet: {
      iconContainer: "bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20",
      badgePill: "bg-violet-500/10 text-violet-700 dark:text-violet-300 border-violet-500/20",
      cardHover: "hover:border-violet-500/30",
    },
    emerald: {
      iconContainer: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
      badgePill: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/20",
      cardHover: "hover:border-emerald-500/30",
    },
    amber: {
      iconContainer: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
      badgePill: "bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/20",
      cardHover: "hover:border-amber-500/30",
    },
  };

  return (
    <section
      aria-labelledby="tech-matrix-heading"
      className={cn(
        "relative overflow-hidden py-16 sm:py-24 border-b border-border/40 bg-background text-foreground transition-colors",
        className,
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Section Telemetry Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12 sm:mb-16">
          <div className="max-w-2xl">
            <p className="text-xs font-mono font-semibold uppercase tracking-widest text-primary mb-3">
              {t("eyebrow" as never)}
            </p>
            <h2
              id="tech-matrix-heading"
              className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground"
            >
              {t("title" as never)}
            </h2>
            <p className="mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
              {t("description" as never)}
            </p>
          </div>

          {/* Section Summary Telemetry Stats */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-2 lg:pt-0">
            <div className="flex flex-col p-3 sm:p-4 rounded-xl border border-border/60 bg-card/40 backdrop-blur-sm min-w-30">
              <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                {t("stat_experience_label" as never)}
              </span>
              <span className="text-base sm:text-lg font-mono font-bold text-primary">
                {t("stat_experience_val" as never)}
              </span>
            </div>
            <div className="flex flex-col p-3 sm:p-4 rounded-xl border border-border/60 bg-card/40 backdrop-blur-sm min-w-30">
              <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                {t("stat_tech_label" as never)}
              </span>
              <span className="text-base sm:text-lg font-mono font-bold text-foreground">
                {t("stat_tech_val" as never)}
              </span>
            </div>
            <div className="flex flex-col p-3 sm:p-4 rounded-xl border border-border/60 bg-card/40 backdrop-blur-sm min-w-30">
              <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                {t("stat_protocols_label" as never)}
              </span>
              <span className="text-base sm:text-lg font-mono font-bold text-status-success">
                {t("stat_protocols_val" as never)}
              </span>
            </div>
          </div>
        </div>

        {/* 4-Quadrant Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {domains.map((domain) => {
            const DomainIcon = domain.icon;
            const domainStyle = domainAccentStyles[domain.accentColor];

            return (
              <div
                key={domain.id}
                className={cn(
                  "relative flex flex-col justify-between p-6 sm:p-8 rounded-2xl border border-border/60 bg-card/50 transition-all duration-300",
                  domainStyle.cardHover,
                )}
              >
                {/* Domain Header Row with flex-wrap according to Rule 33 */}
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2.5 mb-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          "flex items-center justify-center w-9 h-9 rounded-xl border",
                          domainStyle.iconContainer,
                        )}
                      >
                        <DomainIcon className="w-4 h-4" aria-hidden="true" />
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold tracking-tight text-foreground">
                        {t(domain.titleKey as never)}
                      </h3>
                    </div>
                    <span
                      className={cn(
                        "px-2.5 py-1 rounded-full text-xs font-mono font-medium border",
                        domainStyle.badgePill,
                      )}
                    >
                      {t(domain.badgeCountKey as never)}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-6">
                    {t(domain.summaryKey as never)}
                  </p>
                </div>

                {/* SkillBadges Flex Container */}
                <div
                  role="list"
                  className="flex flex-wrap items-center gap-2.5 pt-2"
                >
                  {domain.skills.map((skill) => (
                    <div key={skill.id} role="listitem">
                      <SkillBadge
                        skill={skill}
                        accentColor={domain.accentColor}
                      />
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

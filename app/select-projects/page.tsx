"use client";

// Components
import { ContentMasthead } from "@/components/ContentMasthead";
import { Content } from "@/components/Content";
import { TreeMenu } from "@/components/TreeMenu";

// Utils
import { getRandomYear, classes } from "@/utils";

// Constants
export const PROJECTS = [
  {
    children: [
      {
        href: "/projects/independent-brands",
        id: "e94d65bb-dabf-44dc-a857-8217c269400e",
        label: "Americana Motor Hotel",
        year: getRandomYear(),
      },
      {
        href: "/projects/independent-brands",
        id: "ed0f6a46-0a99-4494-81c4-d42682816d78",
        label: "Colee (Public Spaces)",
        year: getRandomYear(),
      },
      {
        href: "/projects/independent-brands",
        id: "3dbeca65-03d7-4199-9894-459fff58d97b",
        label: "Hotel Abacus",
        year: getRandomYear(),
      },
      {
        href: "/projects/independent-brands",
        id: "803efdd0-aefb-49cc-be20-17ebc3f111a6",
        label: "Hotel Lincoln",
        year: getRandomYear(),
      },
      {
        href: "/projects/independent-brands",
        id: "24998164-2f3d-4920-9012-45fb92e69c17",
        label: "Pontchartrain Hotel",
        year: getRandomYear(),
      },
    ],
    href: "/projects/independent-brands",
    id: "17c4d9b7-2a36-4aed-8522-7f2e875ac5a3",
    label: "Independent Brands",
  },
  {
    children: [
      {
        href: "/projects/graduate-hotels",
        id: "b82a6397-7293-4767-b4c7-6a5d340effec",
        label: "Ann Arbor, MI",
        year: getRandomYear(),
      },
      {
        href: "/projects/graduate-hotels",
        id: "889bdb61-3265-4a64-a3b0-9b44c3fbbd61",
        label: "Annapolis, MD",
        year: getRandomYear(),
      },
      {
        href: "/projects/graduate-hotels",
        id: "bf5569d2-3311-49d9-b144-cfd2a4dd3f03",
        label: "Athens, GA",
        year: getRandomYear(),
      },
      {
        href: "/projects/graduate-hotels",
        id: "d263f89a-614b-45a5-876d-f67b4f46775a",
        label: "Berkeley, CA",
        year: getRandomYear(),
      },
      {
        href: "/projects/graduate-hotels",
        id: "d84ea76c-68ce-4c1c-a5a1-06132b2cde7f",
        label: "Bloomington, IN",
        year: getRandomYear(),
      },
      {
        href: "/projects/graduate-hotels",
        id: "40c5fbef-4877-4de3-b79a-142be6ec865c",
        label: "Cincinnati, OH",
        year: getRandomYear(),
      },
      {
        href: "/projects/graduate-hotels",
        id: "7498cbeb-b106-46f6-b0f4-e2d01eb32104",
        label: "Eugene, OR",
        year: getRandomYear(),
      },
      {
        href: "/projects/graduate-hotels",
        id: "9a2e9b60-f5e0-4890-b7d5-d3f88475b692",
        label: "Fayetteville, AK",
        year: getRandomYear(),
      },
      {
        href: "/projects/graduate-hotels",
        id: "fe7cf127-db1f-457b-85db-30cab633e37b",
        label: "Iowa City, IA",
        year: getRandomYear(),
      },
      {
        href: "/projects/graduate-hotels",
        id: "026af890-303d-4e9a-ac4c-ddeb3b2f9fa7",
        label: "Knoxville, TN",
        year: getRandomYear(),
      },
      {
        href: "/projects/graduate-hotels",
        id: "e17059de-f5b7-4857-bcd8-5472635ac03e",
        label: "Lincoln, NE",
        year: getRandomYear(),
      },
      {
        href: "/projects/graduate-hotels",
        id: "b22e4e45-ceed-4a13-804b-3ee91ebd57a2",
        label: "Richmond, VA",
        year: getRandomYear(),
      },
      {
        href: "/projects/graduate-hotels",
        id: "f2c9854d-bdab-475c-9a22-9f737ac78df3",
        label: "Seattle, WA",
        year: getRandomYear(),
      },
      {
        href: "/projects/graduate-hotels",
        id: "e9a75cc4-d26a-4323-abec-982b07cd3fa3",
        label: "State College, PA",
        year: getRandomYear(),
      },
    ],
    href: "/projects/graduate-hotels",
    id: "aab83a7a-3f45-43e3-8ea4-65046f90fa6a",
    label: "Graduate Hotels Portfolio",
  },
];

export default function SelectProjects({ className }: { className?: string }) {
  return (
    <Content className={className}>
      <ContentMasthead>Select Projects</ContentMasthead>
      <article
        className={classes(
          "flex flex-col font-ringside-regular font-medium leading-[1.35] text-pretty bg-gray-100 grow justify-end",
          "p-[2vw] lg:p-[1vw] pb-[6vh] lg:pb-[6vh] font-semibold text-justify hyphens-auto"
        )}
      >
        <h2>Select Projects</h2>
        <TreeMenu defaultExpanded items={PROJECTS} />
      </article>
    </Content>
  );
}

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
        href: "https://www.americanamotorhotel.com/?utm_medium=organic&utm_source=google&utm_campaign=business_listing",
        id: "e94d65bb-dabf-44dc-a857-8217c269400e",
        label: "Americana Motor Hotel",
        year: getRandomYear(),
      },
      {
        href: "https://www.marriott.com/en-us/hotels/atlah-hotel-colee-atlanta-buckhead-autograph-collection/photos/",
        id: "ed0f6a46-0a99-4494-81c4-d42682816d78",
        label: "Colee (Public Spaces)",
        year: getRandomYear(),
      },
      {
        href: "https://www.hotelabacusathens.com/gallery",
        id: "3dbeca65-03d7-4199-9894-459fff58d97b",
        label: "Hotel Abacus",
        year: getRandomYear(),
      },
      {
        href: "https://www.hyatt.com/jdv-by-hyatt/en-US/chijl-jdv-hotel-lincoln?src=corp_lclb_google_seo_chijl&utm_source=google&utm_medium=organic&utm_campaign=lmr",
        id: "803efdd0-aefb-49cc-be20-17ebc3f111a6",
        label: "Hotel Lincoln",
        year: getRandomYear(),
      },
      {
        href: "https://thepontchartrainhotel.com/gallery/",
        id: "24998164-2f3d-4920-9012-45fb92e69c17",
        label: "Pontchartrain Hotel",
        year: getRandomYear(),
      },
    ],
    id: "17c4d9b7-2a36-4aed-8522-7f2e875ac5a3",
    label: "Independent Brands",
  },
  {
    children: [
      {
        href: "https://www.hilton.com/en/hotels/arbgagu-graduate-ann-arbor/gallery/",
        id: "b82a6397-7293-4767-b4c7-6a5d340effec",
        label: "Ann Arbor, MI",
        year: getRandomYear(),
      },
      {
        href: "https://www.hilton.com/en/hotels/anpgagu-graduate-annapolis/gallery/",
        id: "889bdb61-3265-4a64-a3b0-9b44c3fbbd61",
        label: "Annapolis, MD",
        year: getRandomYear(),
      },
      {
        href: "https://www.hotelabacusathens.com/gallery",
        id: "bf5569d2-3311-49d9-b144-cfd2a4dd3f03",
        label: "Athens, GA",
        year: getRandomYear(),
      },
      {
        href: "https://www.hilton.com/en/hotels/oakgbgu-graduate-berkeley/gallery/",
        id: "d263f89a-614b-45a5-876d-f67b4f46775a",
        label: "Berkeley, CA",
        year: getRandomYear(),
      },
      {
        href: "https://www.hilton.com/en/hotels/indgbgu-graduate-bloomington/gallery/",
        id: "d84ea76c-68ce-4c1c-a5a1-06132b2cde7f",
        label: "Bloomington, IN",
        year: getRandomYear(),
      },
      {
        href: "https://www.hilton.com/en/hotels/chogcgu-graduate-charlottesville/gallery/",
        id: "602bdae1-4297-4e9a-97bf-810df1889d2e",
        label: "Charlottesville, VA",
        year: getRandomYear(),
      },
      {
        href: "https://www.hilton.com/en/hotels/cvggcgu-graduate-cincinnati/gallery/",
        id: "40c5fbef-4877-4de3-b79a-142be6ec865c",
        label: "Cincinnati, OH",
        year: getRandomYear(),
      },
      {
        href: "https://www.hilton.com/en/hotels/caegcgu-graduate-columbia-sc/gallery/",
        id: "00a57713-6b14-4193-b85c-ae411043efce",
        label: "Columbia, SC",
        year: getRandomYear(),
      },
      {
        href: "https://www.hilton.com/en/hotels/cmhclgu-graduate-columbus/gallery/",
        id: "b364cf30-3369-4fe6-a7ba-b3eeb7e758d8",
        label: "Columbus, OH",
        year: getRandomYear(),
      },
      {
        href: "https://www.hilton.com/en/hotels/euggegu-graduate-eugene/gallery/",
        id: "7498cbeb-b106-46f6-b0f4-e2d01eb32104",
        label: "Eugene, OR",
        year: getRandomYear(),
      },
      {
        href: "https://www.hilton.com/en/hotels/fyvgfgu-graduate-fayetteville/gallery/",
        id: "9a2e9b60-f5e0-4890-b7d5-d3f88475b692",
        label: "Fayetteville, AK",
        year: getRandomYear(),
      },
      {
        href: "https://www.hilton.com/en/hotels/cidgigu-graduate-iowa-city/gallery/",
        id: "fe7cf127-db1f-457b-85db-30cab633e37b",
        label: "Iowa City, IA",
        year: getRandomYear(),
      },
      {
        href: "https://www.hilton.com/en/hotels/tysgkgu-graduate-knoxville/gallery/",
        id: "026af890-303d-4e9a-ac4c-ddeb3b2f9fa7",
        label: "Knoxville, TN",
        year: getRandomYear(),
      },
      {
        href: "https://www.hilton.com/en/hotels/lnkglgu-graduate-lincoln/gallery/",
        id: "e17059de-f5b7-4857-bcd8-5472635ac03e",
        label: "Lincoln, NE",
        year: getRandomYear(),
      },
      {
        href: "https://www.hilton.com/en/hotels/msngmgu-graduate-madison/gallery/",
        id: "9a141164-e0c1-49ff-bbad-118ddaef3821",
        label: "Madison, WI",
        year: getRandomYear(),
      },
      {
        href: "https://www.hilton.com/en/hotels/mkgmgcgu-graduate-minneapolis/gallery/",
        id: "b22e4e45-ceed-4a13-804b-3ee91ebd57a2",
        label: "Minneapolis, MN",
        year: getRandomYear(),
      },
      {
        href: "https://www.hilton.com/en/hotels/bnagngu-graduate-nashville/gallery/",
        id: "04e76600-3083-4314-9f7b-53fde59e6ed6",
        label: "Nashville, TN",
        year: getRandomYear(),
      },
      {
        href: "https://www.hilton.com/en/hotels/hvngngu-graduate-new-haven/gallery/",
        id: "3df5c580-f2b2-4fe5-b17b-ed4bb31608f3",
        label: "New Haven, CT",
        year: getRandomYear(),
      },
      {
        href: "https://www.hilton.com/en/hotels/nycgngu-graduate-new-york/gallery/",
        id: "3bdfcf63-bb82-46ae-92e6-5211c241a654",
        label: "New York, NY",
        year: getRandomYear(),
      },
      {
        href: "https://www.hilton.com/en/hotels/tupgogu-graduate-oxford/gallery/",
        id: "49619dec-507a-4cc6-93d7-0d87b11c1fed",
        label: "Oxford, MS",
        year: getRandomYear(),
      },
      {
        href: "https://www.hilton.com/en/hotels/pvdgpgu-graduate-providence/gallery/",
        id: "7a41517b-15c7-47d2-9855-f7658bc2336b",
        label: "Providence, RI",
        year: getRandomYear(),
      },
      {
        href: "https://www.hilton.com/en/hotels/ricgrgu-graduate-richmond/gallery/",
        id: "d3b1d3de-8128-42d3-b312-24bd3e7dc6ca",
        label: "Richmond, VA",
        year: getRandomYear(),
      },
      {
        href: "https://www.hilton.com/en/hotels/seagsgu-graduate-seattle/gallery/",
        id: "f2c9854d-bdab-475c-9a22-9f737ac78df3",
        label: "Seattle, WA",
        year: getRandomYear(),
      },
      {
        href: "https://www.hilton.com/en/hotels/scegsgu-graduate-state-college/gallery/",
        id: "e9a75cc4-d26a-4323-abec-982b07cd3fa3",
        label: "State College, PA",
        year: getRandomYear(),
      },
      {
        href: "https://www.hilton.com/en/hotels/phxgpgu-graduate-tempe/gallery/",
        id: "ba074b7a-8c7a-4547-bac5-a4c15a84f52e",
        label: "Tempe, AZ",
        year: getRandomYear(),
      },
    ],
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
          "flex flex-col font-ringside-regular font-medium leading-[1.2] text-pretty bg-gray-100",
          "p-[2vw] lg:p-[1vw] pb-[6vh] lg:pb-[6vh] font-semibold"
        )}
      >
        <h2>Select Projects</h2>
        <TreeMenu defaultExpanded items={PROJECTS} />
      </article>
    </Content>
  );
}

"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { AnimatePresence, motion } from "framer-motion";
import { Button, ConfigProvider, Form, Input } from "antd";

import Bigun from "@/assets/svg/bigun.svg";

// Consts
import { FILMS, NAMES, TITLES } from "./consts";

// Utils
import { classes } from "@/utils";

interface SignatureFormValues {
  name: string;
  title: string;
  telephone: string;
}

const pickRandom = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

const defaultValues: SignatureFormValues = {
  // name: "Brandon Durham",
  // title: "Senior Software Developer/Designer",
  // telephone: "(512) 527-4626",
};

const Heading = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => {
  return (
    <h2 className={classes("font-plain-black -tracking-[0.02em] leading-[1.2]", className)}>
      {children}
    </h2>
  );
};

export default function Signature() {
  const [toast, setToast] = useState<string | null>(null);

  const showToast = useCallback((text: string) => {
    setToast(text);
    setTimeout(() => setToast(null), 3000);
  }, []);

  const signatureRef = useRef<HTMLDivElement>(null);
  const [randomName, setRandomName] = useState("");
  const [randomTitle, setRandomTitle] = useState("");
  const [randomMessage, setRandomMessage] = useState("");
  const [randomCharacter, setRandomCharacter] = useState("");
  const [randomFilmTitle, setRandomFilmTitle] = useState("");

  useEffect(() => {
    const film = pickRandom(FILMS);
    setRandomName(pickRandom(NAMES));
    setRandomTitle(pickRandom(TITLES));
    setRandomCharacter(pickRandom(film.characters));
    setRandomFilmTitle(film.title);
    setRandomMessage(pickRandom(film.quotes));
  }, []);

  const { control, handleSubmit, formState: { errors, isValid } } = useForm<SignatureFormValues>({ defaultValues, mode: "onChange" });

  const [submittedValues, setSubmittedValues] = useState<SignatureFormValues>(defaultValues);

  const onSubmit = (data: SignatureFormValues) => {
    setSubmittedValues(data);
  };

  const [activePanel, setActivePanel] = useState(0);
  const [direction, setDirection] = useState(0);
  
  const goToPanel = (index: number) => {
    setDirection(index > activePanel ? 1 : -1);
    setActivePanel(index);
  };

  const panelVariants = {
    initial: (d: number) => ({ y: d > 0 ? "100%" : "-100%", opacity: 0 }),
    animate: { y: 0, opacity: 1 },
    exit: (d: number) => ({ y: d > 0 ? "-100%" : "100%", opacity: 0 }),
  };

  const copySignature = useCallback(async () => {
    const el = signatureRef.current;
    if (!el) return;
    const html = el.outerHTML;
    const plain = el.innerText;
    try {
      await navigator.clipboard.write([
        new ClipboardItem({
          "text/html": new Blob([html], { type: "text/html" }),
          "text/plain": new Blob([plain], { type: "text/plain" }),
        }),
      ]);
      showToast("Signature copied to clipboard!");
    } catch {
      showToast("Failed to copy signature. Please try again.");
    }
  }, [showToast]);

  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: "var(--font-ringside-regular)",
        },
        components: {
          Button: {
            // Default button
            defaultBg: "var(--color-highlight)", // background
            defaultColor: "#ffffff", // text color
            defaultBorderColor: "var(--color-highlight)", // border color
            defaultHoverBg: "#ffffff",
            defaultHoverColor: "var(--color-highlight)",
            defaultHoverBorderColor: "var(--color-highlight)",
            defaultActiveBg: "var(--color-highlight)",
            defaultActiveColor: "#ffffff",
            defaultActiveBorderColor: "var(--color-highlight)",

            // General
            fontWeight: 600,
          },
          Form: { labelFontSize: 16 },
        },
      }}
    >
      <div className="bg-[#fec5c6] basis-1/2 flex flex-col items-center justify-center gap-8 p-[3.5vw] overflow-y-auto">
        <Heading className="text-[#ff0000] text-center text-[6.66vw] grow flex items-center justify-center leading-[1.1]">
          Let’s Create Your Signature
        </Heading>
        <Bigun className="text-[#ff0000]" width="22%" />
      </div>
      <div className="basis-1/2 flex flex-col bg-gray-100 text-black">
        <div className="relative grow overflow-hidden">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={activePanel}
              custom={direction}
              variants={panelVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{
                type: "tween",
                duration: 0.8,
                ease: [0.87, 0, 0.13, 1],
              }}
              className="absolute inset-0 overflow-y-auto p-[3.5vw] flex flex-col"
            >
              {activePanel === 0 && (
                <div className="px-[1vw]">
                  <header className="flex flex-col items-center justify-center pb-[calc(3.5vw)] pt-8 text-center gap-4">
                    <Heading className="text-[#ff0000] text-[5vw] text-center leading-[1.03]">
                      Enter Your Details
                    </Heading>
                  </header>
                  <Form layout="vertical">
                    <Form.Item
                      label="Full Name"
                      required
                      validateStatus={errors.name ? "error" : ""}
                      help={errors.name?.message}
                    >
                      <Controller
                        name="name"
                        control={control}
                        rules={{ required: "Full name is required." }}
                        render={({ field }) => (
                          <Input placeholder={randomName} size="large" {...field} />
                        )}
                      />
                    </Form.Item>
                    <Form.Item
                      label="Title"
                      required
                      validateStatus={errors.title ? "error" : ""}
                      help={errors.title?.message}
                    >
                      <Controller
                        name="title"
                        control={control}
                        rules={{ required: "Title is required." }}
                        render={({ field }) => (
                          <Input placeholder={randomTitle} size="large" {...field} />
                        )}
                      />
                    </Form.Item>
                    <Form.Item label="Telephone (optional)">
                      <Controller
                        name="telephone"
                        control={control}
                        render={({ field }) => (
                          <Input
                            placeholder="(312) 344-3440"
                            size="large"
                            {...field}
                          />
                        )}
                      />
                    </Form.Item>
                  </Form>
                </div>
              )}
              {activePanel === 1 && (
                <div className="px-[1vw]">
                  <header className="flex flex-col items-center justify-center pb-[calc(3.5vw)] py-8 text-center gap-6">
                    <Heading className="text-[#ff0000] text-[5vw] text-center leading-[1.03]">
                      Your Signature Will Look Like This
                    </Heading>
                    <p>
                      If this doesn’t look right click “Previous” and make sure
                      you’ve entered all the information correctly.
                    </p>
                  </header>
                  <div className="bg-black/3 -mx-[4.5vw] -mb-[3.5vw] pb-14 pt-8 px-[4.5vw]">
                    <div className="flex flex-col gap-4 text-[1rem]">
                      <hgroup className="border-b border-black/12 pb-4">
                        <div className="flex gap-2">
                          <div className="w-[5em]">To:</div>
                          <div className="grow">{randomCharacter}</div>
                        </div>
                        <div className="flex gap-2">
                          <div className="w-[5em]">Subject:</div>
                          <div className="grow">{randomFilmTitle}</div>
                        </div>
                        <div className="flex gap-2">
                          <div className="w-[5em]">From:</div>
                          <div className="grow">
                            {submittedValues.name.length
                              ? submittedValues.name
                              : randomName}
                          </div>
                        </div>
                      </hgroup>
                      <p>{randomMessage}</p>
                    </div>
                    <div
                      ref={signatureRef}
                      style={{
                        fontFamily:
                          "ui-monospace, 'Cascadia Code', 'Source Code Pro', Menlo, Consolas, 'DejaVu Sans Mono', 'Liberation Mono', monospace",
                        fontSize: "12px",
                        lineHeight: 1.4,
                      }}
                    >
                      <br />
                      <br />
                      <br />
                      {"=".repeat(
                        submittedValues.name.length
                          ? submittedValues.name.length
                          : randomName?.length,
                      )}
                      <br />
                      {submittedValues.name.length ? (
                        <b style={{ fontWeight: "bold" }}>
                          {submittedValues.name}
                        </b>
                      ) : (
                        <b style={{ fontWeight: "bold" }}>{randomName}</b>
                      )}
                      <br />
                      {submittedValues.title.length ? (
                        <i style={{ fontStyle: "italic" }}>
                          {submittedValues.title}
                        </i>
                      ) : (
                        <i style={{ fontStyle: "italic" }}>{randomTitle}</i>
                      )}
                      <br />
                      <br />
                      <b style={{ fontWeight: "bold" }}>
                        Andrew Alford Creative
                      </b>
                      <br />
                      330 SE Martin Luther King Blvd, Suite 3A
                      <br />
                      Portland, OR 97214
                      <br />
                      {submittedValues.telephone?.length ? (
                        <>{submittedValues.telephone}</>
                      ) : (
                        "+1 (312) 344-3440"
                      )}
                      <br />
                      <a
                        href="https://andrewalfordcreative.com"
                        style={{
                          color: "blue",
                          textDecoration: "underline",
                        }}
                      >
                        andrewalfordcreative.com
                      </a>
                      <br />
                      <a
                        href="https://www.instagram.com/andrewalfordcreative/"
                        style={{
                          color: "blue",
                          textDecoration: "underline",
                        }}
                      >
                        Instagram
                      </a>
                      ,{" "}
                      <a
                        href="https://www.linkedin.com/in/andrewalfordcreative/"
                        style={{
                          color: "blue",
                          textDecoration: "underline",
                        }}
                      >
                        LinkedIn
                      </a>
                      <br />
                      <br />
                      <img
                        src="https://andrewalfordcreative.com/big-a.png"
                        alt="Signature"
                        width={200}
                        height={200 * 0.33333333}
                      />
                      <br />
                      <br />
                      <span>
                        If you're reading this and it wasn't intended for you,
                        then the universe needed you to hear that no one ever
                        looked at a sunset and said, "I wish it was more beige."
                        Aspirational mediocrity is a crime, and design should
                        always be a love letter. If you're still reading this
                        and it isn't intended for you, or even if it is, please
                        send us unusual and unexpected physical mail to the
                        address listed above. Who doesn't love a strange happy
                        surprise?
                      </span>
                    </div>
                  </div>
                </div>
              )}
              {activePanel === 2 && (
                <div className="px-[1vw]">
                  <header className="flex flex-col items-center justify-center pb-[calc(3.5vw)] pt-8 text-center gap-4">
                    <Heading className="text-[#ff0000] text-[5vw] text-center leading-[1.03]">
                      Adding the Signature to Your E-mail Program
                    </Heading>
                  </header>
                  <div className="text-[0.94em]">
                    <h3 className="text-[1.15em] font-semibold mb-2">
                      Apple Mail (desktop)
                    </h3>
                    <ol className="list-decimal text-wrap">
                      <li>
                        Open Settings in Apple Mail (Menu{" "}
                        <span className="text-[12px]">▶</span> Mail{" "}
                        <span className="text-[12px]">▶</span> Settings).
                      </li>
                      <li>In the menu at the top click on “Signatures.”</li>
                      <li>
                        In the “Signatures” panel select your AAC email on the
                        left.
                      </li>
                      <li>At the bottom of the window click the “+” button.</li>
                      <li>Name the new signature “AAC Signature.”</li>
                      <li>
                        At the bottom right there is a checkbox labeled “Always
                        match my default message font.” Uncheck it.
                      </li>
                      <li>
                        Click into the white box above that checkbox. It likely
                        has some default signauture text in it. Delete that
                        text.
                      </li>
                      <li>
                        Now paste your new signature into this box. You may not
                        see the logo appear here. That’s okay. When you create a
                        new AAC email you should see it.
                      </li>
                      <li>Close the Settings window.</li>
                      <li>
                        Open a new email and make sure the signature appears as
                        expected. If it’s missing in your email, click the
                        "Signature" dropdown on the right and select the
                        signature you just created. Apple Mail <em>still</em> may not show the signature. If not, close the draft email and open a new one. It should appear now and every time you draft a new AAC email.
                      </li>
                    </ol>
                  </div>
                </div>
              )}
              {activePanel === 3 && (
                <div className="h-full flex flex-col gap-8">
                  <Heading className="animate-blink flex items-center text-[#ff0000] text-[14vw] text-center leading-[1.03] grow">
                    Great Job!
                  </Heading>
                  <p className="text-[1.1em] font-normal text-center">
                    If you have any problems; your email program of choice isn’t
                    listed here; or if you’d like me to double-check your
                    signature, please reach out to me at{" "}
                    <a href="mailto:brandon@andrewalfordcreative.com">
                      brandon@andrewalfordcreative.com
                    </a>
                    .
                  </p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
        <footer className="relative p-8 flex gap-4 items-center justify-between border-t border-black/12">
          <AnimatePresence>
            {toast && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.2 }}
                className="absolute left-1/2 -translate-x-1/2 bottom-[calc(100%+0.5rem)] flex justify-center pb-3"
              >
                <div className="bg-black text-white text-sm px-4 py-2 rounded-md">
                  {toast}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <Button
            disabled={activePanel === 0}
            onClick={() => goToPanel(activePanel - 1)}
            size="large"
          >
            Previous
          </Button>
          <Button
            disabled={activePanel === 3 || (activePanel === 0 && !isValid)}
            onClick={() => {
              if (activePanel === 0) {
                handleSubmit((data) => {
                  onSubmit(data);
                  goToPanel(1);
                })();
              } else if (activePanel === 1) {
                copySignature();
                goToPanel(2);
              } else {
                goToPanel(activePanel + 1);
              }
            }}
            size="large"
          >
            Next
          </Button>
        </footer>
      </div>
    </ConfigProvider>
  );
}

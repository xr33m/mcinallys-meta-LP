"use client";

import { useState } from "react";
import { useLead, type Assessment } from "./LeadProvider";
import { Check } from "./icons";

const AGE = ["Under 5 years", "5–10 years", "10–15 years", "15+ years", "Not sure"];
const AGE_PTS = [0, 1, 2, 3, 1];
const SERVICE = [
  "Within the last 12 months",
  "1–2 years ago",
  "More than 2 years ago",
  "Never / don't know",
];
const SERVICE_PTS = [0, 1, 2, 3];
const SYMPTOMS = [
  "Strange noises (banging, whistling)",
  "Pressure keeps dropping",
  "Radiators with cold spots",
  "Slow to heat or needs resetting",
];

const RESULT = {
  Low: {
    title: "Looking healthy",
    body: "Your boiler shows few warning signs. A yearly service is the cheapest way to keep it that way.",
    tone: "bg-white border-teal text-navy",
  },
  Medium: {
    title: "Worth servicing before winter",
    body: "A few factors suggest a service now would be sensible, while it's easy to book a slot and not a rush job.",
    tone: "bg-brand/30 border-navy text-navy",
  },
  High: {
    title: "Book your service soon",
    body: "Several factors point to a boiler that would benefit from a proper check. Booking before the cold weather arrives gives you the most choice of slots.",
    tone: "bg-brand border-navy text-navy",
  },
} as const;

export function WinterCheck({ price }: { price: number }) {
  const { assessment, setAssessment } = useLead();
  const [step, setStep] = useState(0);
  const [started, setStarted] = useState(false);
  const [age, setAge] = useState("");
  const [agePts, setAgePts] = useState(0);
  const [last, setLast] = useState("");
  const [lastPts, setLastPts] = useState(0);
  const [symptoms, setSymptoms] = useState<string[]>([]);

  function finish(sym: string[]) {
    const score = agePts + lastPts + Math.min(sym.length, 3);
    const level: Assessment["level"] =
      score >= 6 ? "High" : score >= 3 ? "Medium" : "Low";
    setAssessment({ boilerAge: age, lastService: last, symptoms: sym, score, level });
  }

  function reset() {
    setAssessment(null);
    setStep(0);
    setAge("");
    setLast("");
    setSymptoms([]);
  }

  const optionBtn =
    "flex min-h-14 w-full items-center border-2 border-navy bg-white px-4 py-3 text-left text-base font-semibold transition hover:bg-brand/20 active:translate-x-[2px] active:translate-y-[2px]";

  return (
    <section id="check" className="bg-teal-tint px-4 py-14 sm:py-20">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <div>
          <p className="kicker">Free · 30 seconds</p>
          <h2 className="h-display mt-2 text-5xl sm:text-6xl">Is your boiler ready for winter?</h2>
          <p className="mt-4 max-w-md text-navy/70">
            Three taps, no sign-up. You get a simple winter-readiness result, and Ryan sees your answers if you book.
          </p>
        </div>

        <div className="border-2 border-navy bg-white p-5 shadow-hard sm:p-7">
          {!started && !assessment && (
            <div>
              <p className="text-navy/70">Not sure whether yours needs a service? Find out in 30 seconds.</p>
              <button
                onClick={() => setStarted(true)}
                className="btn mt-5 w-full bg-navy text-white hover:bg-navy-deep sm:w-auto"
              >
                Start the 30-second check
              </button>
              <p className="mt-4 text-sm font-medium">
                <a href="#book" className="font-bold text-teal-dark underline underline-offset-2">
                  Skip it and book the £{price} service
                </a>
              </p>
            </div>
          )}

          {started && !assessment && (
            <div>
              <div className="mb-4 flex items-center gap-3">
                <div className="h-2.5 flex-1 border-2 border-navy bg-white">
                  <div
                    className="h-full bg-brand transition-all"
                    style={{ width: `${((step + 1) / 3) * 100}%` }}
                  />
                </div>
                <span className="font-display text-lg font-bold uppercase tracking-wide">{step + 1} / 3</span>
              </div>

              {step === 0 && (
                <fieldset>
                  <legend className="mb-3 font-display text-2xl font-bold uppercase tracking-wide">How old is your boiler?</legend>
                  <div className="grid gap-2.5">
                    {AGE.map((o, i) => (
                      <button
                        key={o}
                        className={optionBtn}
                        onClick={() => {
                          setAge(o);
                          setAgePts(AGE_PTS[i]);
                          setStep(1);
                        }}
                      >
                        {o}
                      </button>
                    ))}
                  </div>
                </fieldset>
              )}

              {step === 1 && (
                <fieldset>
                  <legend className="mb-3 font-display text-2xl font-bold uppercase tracking-wide">When was it last serviced?</legend>
                  <div className="grid gap-2.5">
                    {SERVICE.map((o, i) => (
                      <button
                        key={o}
                        className={optionBtn}
                        onClick={() => {
                          setLast(o);
                          setLastPts(SERVICE_PTS[i]);
                          setStep(2);
                        }}
                      >
                        {o}
                      </button>
                    ))}
                  </div>
                </fieldset>
              )}

              {step === 2 && (
                <fieldset>
                  <legend className="mb-1 font-display text-2xl font-bold uppercase tracking-wide">Noticed anything lately?</legend>
                  <p className="mb-3 text-sm text-navy/70">Tick any that apply, or none.</p>
                  <div className="grid gap-2.5">
                    {SYMPTOMS.map((o) => {
                      const on = symptoms.includes(o);
                      return (
                        <button
                          key={o}
                          aria-pressed={on}
                          className={`${optionBtn} gap-3 ${on ? "bg-brand/30" : ""}`}
                          onClick={() =>
                            setSymptoms((s) => (on ? s.filter((x) => x !== o) : [...s, o]))
                          }
                        >
                          <span
                            className={`flex h-6 w-6 shrink-0 items-center justify-center border-2 border-navy ${on ? "bg-navy text-white" : "bg-white"}`}
                          >
                            {on && <Check className="h-4 w-4" />}
                          </span>
                          {o}
                        </button>
                      );
                    })}
                  </div>
                  <button
                    onClick={() => finish(symptoms)}
                    className="btn mt-4 w-full bg-navy text-white hover:bg-navy-deep"
                  >
                    {symptoms.length ? "See my result" : "Nothing, see my result"}
                  </button>
                </fieldset>
              )}

              {step > 0 && (
                <button
                  onClick={() => setStep(step - 1)}
                  className="mt-4 text-sm font-semibold text-navy/70 underline underline-offset-2"
                >
                  Back
                </button>
              )}
            </div>
          )}

          {assessment && (
            <div aria-live="polite">
              <div className={`border-2 p-4 ${RESULT[assessment.level].tone}`}>
                <p className="font-display text-sm font-bold uppercase tracking-[0.15em] opacity-70">
                  Your winter-readiness result
                </p>
                <p className="h-display mt-1 text-3xl">{RESULT[assessment.level].title}</p>
                <p className="mt-1 text-sm">{RESULT[assessment.level].body}</p>
              </div>
              <a
                href="#book"
                className="btn-yellow mt-4 w-full"
              >
                Book my £{price} service →
              </a>
              <p className="mt-3 text-center text-xs text-navy/70">
                We&rsquo;ll attach your answers so Ryan knows what to look out for.{" "}
                <button onClick={reset} className="font-semibold underline">
                  Retake
                </button>
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

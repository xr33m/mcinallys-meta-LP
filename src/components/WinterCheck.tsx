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
    tone: "bg-emerald-50 border-emerald-300 text-emerald-900",
  },
  Medium: {
    title: "Worth servicing before winter",
    body: "A few factors suggest a service now would be sensible, while it's easy to book a slot and not a rush job.",
    tone: "bg-amber-50 border-amber-300 text-amber-900",
  },
  High: {
    title: "Book your service soon",
    body: "Several factors point to a boiler that would benefit from a proper check. Booking before the cold weather arrives gives you the most choice of slots.",
    tone: "bg-orange-50 border-orange-300 text-orange-900",
  },
} as const;

export function WinterCheck() {
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
    "flex min-h-14 w-full items-center rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-left text-base font-medium transition active:scale-[0.99] hover:border-teal";

  return (
    <section id="check" className="bg-teal-tint px-4 py-12 sm:py-16">
      <div className="mx-auto max-w-xl">
        <p className="text-center text-sm font-bold uppercase tracking-wider text-teal">
          Free · 30 seconds
        </p>
        <h2 className="mt-2 text-center text-2xl font-extrabold sm:text-3xl">
          Is your boiler ready for winter?
        </h2>

        <div className="mt-6 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200 sm:p-7">
          {!started && !assessment && (
            <div className="text-center">
              <p className="text-slate-600">
                Answer 3 quick taps and get a simple winter-readiness score for your boiler. No sign-up needed.
              </p>
              <button
                onClick={() => setStarted(true)}
                className="mt-5 inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-teal px-6 text-base font-bold text-white hover:bg-teal-dark sm:w-auto"
              >
                Start the 30-second check
              </button>
              <p className="mt-4 text-sm">
                <a href="#book" className="font-semibold text-teal underline underline-offset-2">
                  Skip it and book the £80 service
                </a>
              </p>
            </div>
          )}

          {started && !assessment && (
            <div>
              <div className="mb-4 flex items-center gap-3">
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-teal transition-all"
                    style={{ width: `${((step + 1) / 3) * 100}%` }}
                  />
                </div>
                <span className="text-sm font-semibold text-slate-500">{step + 1} of 3</span>
              </div>

              {step === 0 && (
                <fieldset>
                  <legend className="mb-3 text-lg font-bold">How old is your boiler?</legend>
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
                  <legend className="mb-3 text-lg font-bold">When was it last serviced?</legend>
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
                  <legend className="mb-1 text-lg font-bold">Noticed anything lately?</legend>
                  <p className="mb-3 text-sm text-slate-500">Tick any that apply, or none.</p>
                  <div className="grid gap-2.5">
                    {SYMPTOMS.map((o) => {
                      const on = symptoms.includes(o);
                      return (
                        <button
                          key={o}
                          aria-pressed={on}
                          className={`${optionBtn} gap-3 ${on ? "border-teal bg-teal-tint" : ""}`}
                          onClick={() =>
                            setSymptoms((s) => (on ? s.filter((x) => x !== o) : [...s, o]))
                          }
                        >
                          <span
                            className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md border-2 ${on ? "border-teal bg-teal text-white" : "border-slate-300"}`}
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
                    className="mt-4 min-h-12 w-full rounded-xl bg-teal px-6 text-base font-bold text-white hover:bg-teal-dark"
                  >
                    {symptoms.length ? "See my result" : "Nothing, see my result"}
                  </button>
                </fieldset>
              )}

              {step > 0 && (
                <button
                  onClick={() => setStep(step - 1)}
                  className="mt-4 text-sm font-semibold text-slate-500 underline underline-offset-2"
                >
                  Back
                </button>
              )}
            </div>
          )}

          {assessment && (
            <div aria-live="polite">
              <div className={`rounded-xl border-2 p-4 ${RESULT[assessment.level].tone}`}>
                <p className="text-xs font-bold uppercase tracking-wider opacity-70">
                  Your winter-readiness result
                </p>
                <p className="mt-1 text-xl font-extrabold">{RESULT[assessment.level].title}</p>
                <p className="mt-1 text-sm">{RESULT[assessment.level].body}</p>
              </div>
              <a
                href="#book"
                className="mt-4 flex min-h-12 w-full items-center justify-center rounded-xl bg-brand px-6 text-base font-extrabold text-navy hover:bg-brand-dark"
              >
                Book my £80 service →
              </a>
              <p className="mt-3 text-center text-xs text-slate-500">
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

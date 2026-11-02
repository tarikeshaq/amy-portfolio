import type { Metadata } from "next";
import { Collage, Piece, collageBody } from "@/components/Collage";
import { Footer } from "@/components/Footer";
import {
  Block,
  Column,
  Columns,
  Figure,
  H2,
  HeroTitle,
  Highlight,
  Indent,
  Label,
  NextProject,
  P,
  Stats,
  Summary,
} from "@/components/case-study";
import heroChat from "@/assets/images/work/thought-partner/01-hero-thought-partner-chat.webp";
import citationExamples from "@/assets/images/work/thought-partner/02-citation-format-examples.webp";
import chatbotBefore from "@/assets/images/work/thought-partner/03-chatbot-citations-before.webp";
import disclaimer from "@/assets/images/work/thought-partner/04-knowledge-base-disclaimer.webp";
import trustLevers from "@/assets/images/work/thought-partner/05-trust-levers-diagram.webp";
import stage1 from "@/assets/images/work/thought-partner/06-stage-1-problem-statement.webp";
import stage2 from "@/assets/images/work/thought-partner/07-stage-2-root-cause-questions.webp";
import escapeHatch from "@/assets/images/work/thought-partner/08-escape-hatch-comparison.webp";
import povLessContext from "@/assets/images/work/thought-partner/09-pov-less-context-panel.webp";
import povMoreContext from "@/assets/images/work/thought-partner/10-pov-more-context-panel.webp";
import nextProject from "@/assets/images/work/thought-partner/11-next-project-compute-costs.webp";
import { caseStudies } from "@/lib/site";

const study = caseStudies.find((c) => c.slug === "thought-partner")!;

export const metadata: Metadata = { title: study.title, description: "AI product design case study for PolicyCopilot." };

const tag = "text-diagram w-fit bg-sage px-2 py-1 text-plum";

// Figma "Case study: iterate" (3058:1236); outline in design/extracted/thought-partner.md.
// Block numbers in comments refer to that outline. Body copy is black on this page.
export default function ThoughtPartnerCaseStudy() {
  return (
    <>
      <main className="mx-auto max-w-[1440px] text-black">
        {/* 1–3: hero. Panel bleeds past the right edge in Figma, so the canvas clips. */}
        <Collage height={776} clip className="pt-28 lg:pt-0">
          <Piece x={351} y={0} w={1108} className="hidden lg:block">
            <div aria-hidden className="aspect-[1108/722] bg-panel" />
          </Piece>
          <Piece x={642} y={0} w={817} className="order-2 col-span-2">
            <Figure
              src={heroChat}
              w={817}
              priority
              alt="PolicyCopilot chat in progress: after the user confirms a proposed problem statement about youth underemployment in Pakistan, the AI asks “What do you think are the root causes of the issue?”, showing two user-entered answers, an “Add another” row, and Skip / Submit answers buttons."
            />
          </Piece>
          <Piece x={40} y={101} w={715} className="order-1 col-span-2">
            <HeroTitle
              title="Turning an AI black box into a thought partner: drop-off from 70% to 20%"
              titleClassName="lg:text-[5.5556cqw]"
              meta={["AI product design", "Role: lead product designer", "Team: ML engineer, policy consultant, product manager"]}
            />
          </Piece>
          <Piece x={351} y={726} w={933} className="order-3 col-span-2">
            <p className={`${collageBody} text-plum`}>
              PolicyCopilot is a tool used by policy-makers to diagnose policy problems. The tool included an AI chat
              that helped users retrieve evidence from a curated knowledge base.
            </p>
          </Piece>
        </Collage>

        <Column>
          {/* 4 */}
          <Block space="section">
            <Summary
              w={922}
              rows={[
                {
                  label: "Context",
                  value:
                    "70% of usability testing participants dropped off our AI chatbot because they didn't trust the sources it selected, even though its citations matched the academic papers they trust.",
                },
                {
                  label: "Approach",
                  value:
                    "Showed that a disclaimer about source vetting didn't help, then redesigned the chatbot into a guided flow where users define the problem and root causes that drive which evidence is selected.",
                },
                {
                  label: "Outcome",
                  value: "Drop-off fell from 70% to 20%. Shipped on time for the funder demo that secured $1M.",
                },
              ]}
            />
          </Block>

          {/* 5–7 */}
          <Block space="chapter">
            <H2 w={1294}>Our AI chatbot offered the same citation information as academic papers that users trust</H2>
          </Block>
          <Block space="content">
            <Columns cols={[548, 626]} gap={120}>
              <div>
                <P w={548} className="">
                  Users told us in-text citations and a full reference list are what make research credible...
                </P>
                <Figure
                  src={citationExamples}
                  w={548}
                  className="mt-3"
                  alt="Two excerpts from an academic paper on Pakistan’s education and workforce: a paragraph ending in the in-text citation “(World Bank data, 2019)”, tagged “In-text citation”, and a numbered reference list entry tagged “Reference list”."
                />
              </div>
              <div>
                <P w={626} className="">
                  ... our chatbot already gave them both in the same format so the lack of trust sat somewhere else
                </P>
                <Figure
                  src={chatbotBefore}
                  w={626}
                  className="mt-3"
                  alt="The original PolicyCopilot chat: an AI response about Pakistan’s youth unemployment with superscript in-text citations, a “Citations (3)” button, a youth unemployment rate chart, and a disclaimer listing the curated sources under the input."
                />
              </div>
            </Columns>
          </Block>
          <Block space="content">
            <H2 w={1052}>
              but 7/10 of usability testing participants mentioned “<em>not trusting the selected sources</em>” in our
              AI chatbot, leading to high drop offs
            </H2>
          </Block>

          {/* 8–9 */}
          <Block space="section">
            <H2 w={1084}>Users asked us to explain how sources were vetted so I added a disclaimer.</H2>
            <Highlight hug>Drop-off did not move</Highlight>
          </Block>
          <Block space="content">
            <Columns cols={[671, 478]} gap={9} align="end" stackGap="gap-y-4">
              <Figure
                src={disclaimer}
                w={671}
                alt="The chat input “Describe the problem you’re working on…” with a new disclaimer beneath it: “100+ curated sources – top institutions (WHO, ILO, UN agencies) and peer-reviewed journals (The Lancet, BMJ). Vetted for credibility and recency, updated quarterly.”, tagged “Knowledge base disclaimers”."
              />
              <P w={478} className="">
                After a week live, drop-off went from 70% to 65% across 42 sessions (no meaningful change)
              </P>
            </Columns>
          </Block>

          {/* 10–11 */}
          <Block space="chapter">
            <H2 w={852}>I needed to make structural changes to the product. To start, I explored what levers cultivated trust</H2>
            <P w={852}>I mapped how people decide to trust in general, then how policymakers do specifically.</P>
          </Block>
          <Block space="content">
            <Figure
              src={trustLevers}
              w={1440}
              bleed
              scrollMin={980}
              alt="Nested-ellipse diagram of trust levers. The inner ellipse, “How do people decide to trust something?”, holds Authorship (example: Wealthsimple’s risk-level picker; users trust the output because they trust the inputs) and Human in the loop (example: Claude Code’s approval prompt; the user keeps final authority). The outer ellipse, “How do policy-makers decide to trust something?”, adds Backing from a reputable journal (UNESCO, WHO, UNHCR logos; journals do rigorous vetting) and Transparency into methodology (users can verify the steps taken)."
            />
          </Block>

          {/* 12 */}
          <Block space="section">
            <P w={762} className="">
              I realized our existing solutions had only considered gaining trust from only policy-makers but had not
              considered how to gain a <strong className="font-bold">person’s trust</strong> in general
            </P>
            <H2 w={737} className="mt-3">
              The solution needed to include users in determining the inputs that went into the results and give them
              veto power
            </H2>
          </Block>

          {/* 13–17 */}
          <Block space="chapter">
            <P className="">SOLUTION</P>
            <H2 w={857} className="mt-1">
              The redesign turns one question into a two-stage flow where users steer which evidence is selected
            </H2>
          </Block>
          <Block space="content">
            <Label>Stage 1: Defining the problem</Label>
            <P w={609} className="mt-1">
              The AI asks scoping questions and drafts a problem statement. The user confirms or corrects it, and only
              then does the evidence check run against it
            </P>
            <Figure
              src={stage1}
              w={488}
              className="mt-[clamp(1.75rem,3.33vw,3rem)]"
              alt="Stage 1: a “Problem statement” card summarising child labour in Bangladesh with an “Edit problem statement” button, followed by an “Evidence check” note citing ILO & UNICEF (2021) and Thévenon & Edmonds (2019), and a “Generate mindmap” button."
            />
          </Block>
          <Indent x={476}>
            <Block className="mt-10 lg:mt-0">
              <Label>Stage 2: Diagnosing root causes</Label>
              <P w={555} className="mt-1">
                The user inputs their ideas on root causes or brings their own research and the system compares each
                against the evidence
              </P>
              <Figure
                src={stage2}
                w={555}
                className="mt-[clamp(1.75rem,3.33vw,3rem)]"
                alt="Stage 2: after the user’s reply, a question card asks “What do you think is driving this at that scale?” (Question 1/2) with suggested causes (household income smoothing; school quality and its perceived returns; children taking on caregiving roles at home), an “Add another” row, and Skip / Next question buttons."
              />
            </Block>
          </Indent>

          {/* 18–19 */}
          <Block space="section">
            <H2 w={857}>
              Edge case:
              <br />
              Some users didn&apos;t have the context to answer key questions
            </H2>
            <div className="mt-1">
              <Highlight w={857}>
                I decided:
                <br />
                to build an escape hatch because forcing an answer risked losing users and letting them guess risked a
                misleading output
              </Highlight>
            </div>
          </Block>
          <Block space="double">
            {/* Desktop: the composed comparison from Figma. */}
            <Figure
              src={escapeHatch}
              w={1320}
              className="hidden md:block"
              alt="Side-by-side PolicyCopilot conversations on youth unemployment in Pakistan. Left, a user with less context skips the scoping questions; the AI writes a broader problem statement and a shorter, generalized response with three references. Right, a user who answers gets a detailed problem statement and a longer, driver-by-driver response with twelve references. Annotations: when users take the escape hatch, the AI scopes the problem more broadly and returns a more generalized response, drawing on the same vetted evidence: less specificity, never less rigour."
            />
            {/* Phones: the two panels separately, annotations as live text. */}
            <div className="flex flex-col gap-4 md:hidden">
              <Label>POV: user with less context (escape hatch user)</Label>
              <Figure
                src={povLessContext}
                w={504}
                alt="PolicyCopilot conversation where the user skips the scoping questions; the AI scopes the problem broadly and returns a generalized response with three references."
              />
              <ul className="flex flex-col gap-2">
                <li className={tag}>When users take the escape hatch...</li>
                <li className={tag}>...the AI scopes the problem more broadly...</li>
                <li className={tag}>...and returns a more generalized response</li>
              </ul>
              <p className={tag}>
                It draws on the same vetted evidence, so less input means less specificity, never less rigour. The AI
                doesn&apos;t fill gaps with guesses about the user&apos;s situation
              </p>
              <Label className="mt-6">POV: user with more context (for comparison)</Label>
              <Figure
                src={povMoreContext}
                w={504}
                alt="PolicyCopilot conversation where the user answers the scoping questions; the AI drafts a specific problem statement and returns a detailed, driver-by-driver evidence response with twelve references."
              />
            </div>
          </Block>

          {/* 20–21 */}
          <Block space="chapter">
            <H2 w={737}>The new user experience helped secure a $1M funding round</H2>
            <div className="mt-[clamp(1.75rem,3.33vw,3rem)]">
              <Stats
                title="Other stats"
                items={[
                  { value: "70% → 20%", label: "change in drop-off rate" },
                  { value: "+22%", label: "longer sessions" },
                  {
                    value: "+66%",
                    labelWidth: 235,
                    label: (
                      <>
                        sessions resulted in users using the AI’s evidence
                        <br />
                        (a proxy for trust)
                      </>
                    ),
                  },
                ]}
              />
            </div>
          </Block>

          {/* 22 */}
          <Block space="section">
            <H2 w={857}>Users’ preferences are a weak signal that need to be tested</H2>
            <P w={857}>
              Next time, I would dig deeper by not only hearing what users have to say but also observing what users
              are <u className="decoration-from-font">doing</u>. Based on that, I would validate with quick prototypes
              first before implementing something.
            </P>
          </Block>

          {/* 23–24 */}
          <Block space="chapter">
            <NextProject
              href="/work/compute-costs/"
              title="Cutting compute costs by 30% by redesigning AI responses around common tasks"
              tag="AI product design"
              src={nextProject}
              alt="Preview of the compute-costs case study: a funding-landscape dashboard with a bubble chart of projects and a Gantt timeline of Kenyan youth-employment policies."
            />
          </Block>
        </Column>
      </main>
      <Footer overlap />
    </>
  );
}

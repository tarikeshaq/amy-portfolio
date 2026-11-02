import type { Metadata } from "next";
import { Collage, Piece, collageBody } from "@/components/Collage";
import { Footer } from "@/components/Footer";
import {
  BeforeAfter,
  Block,
  Column,
  Columns,
  Figure,
  H2,
  HeroTitle,
  Highlight,
  Label,
  NextProject,
  P,
  Stats,
  Summary,
} from "@/components/case-study";
import hero from "@/assets/images/work/compute-costs/01-hero-bubble-and-gantt-charts.webp";
import summaryGantt from "@/assets/images/work/compute-costs/02-summary-kenya-gantt-chart.webp";
import taskCards from "@/assets/images/work/compute-costs/03-three-task-cards.webp";
import sampleChat from "@/assets/images/work/compute-costs/04-sample-chat-four-turns.webp";
import quadrant from "@/assets/images/work/compute-costs/05-cost-value-quadrant.webp";
import beforeKenya from "@/assets/images/work/compute-costs/06-before-text-chat-kenya-timeline.webp";
import afterKenya from "@/assets/images/work/compute-costs/07-after-kenya-gantt-chart.webp";
import beforeWestAfrica from "@/assets/images/work/compute-costs/08-before-text-chat-west-africa-conservation.webp";
import afterWestAfrica from "@/assets/images/work/compute-costs/09-after-west-africa-bubble-chart.webp";
import nextProject from "@/assets/images/work/compute-costs/10-next-project-thought-partner-chat.webp";
import { caseStudies } from "@/lib/site";

const study = caseStudies.find((c) => c.slug === "compute-costs")!;

export const metadata: Metadata = { title: study.title, description: "AI product design case study for PolicyCopilot." };

// Figma "V2 Case study: new feature" (3058:1633); outline in design/extracted/compute-costs.md.
// Block numbers in comments refer to that outline.
export default function ComputeCostsCaseStudy() {
  return (
    <>
      <main className="mx-auto max-w-[1440px] text-plum">
        {/* 1–3: hero. The title overlaps the visual panel on desktop. */}
        <Collage height={776} className="pt-28 lg:pt-0">
          <Piece x={328} y={0} w={1108} className="order-2 col-span-2">
            <Figure
              src={hero}
              w={1108}
              priority
              alt="PolicyCopilot visualisations: a bubble chart of policies plotted by approval date against relevancy, with bubbles sized and coloured by funding and issuing body and a detail card open for a West Africa wildlife-management project; below it, a Gantt timeline of six Kenyan youth-employment policies from 2004 to present."
            />
          </Piece>
          <Piece x={20} y={51} w={715} className="order-1 col-span-2">
            <HeroTitle
              title="Cutting compute costs by 30% by redesigning AI responses around common tasks"
              titleClassName="lg:text-[5.5556cqw]"
              meta={[
                "AI Product design",
                "Role: lead product designer",
                "Team: product manager, data scientist, 2 engineers, policy consultant",
              ]}
              metaWidth={299}
            />
          </Piece>
          <Piece x={328} y={726} w={933} className="order-3 col-span-2">
            <p className={collageBody}>
              PolicyCopilot is a tool used by policy-makers to diagnose policy problems. The tool included an AI chat
              that helped users retrieve evidence from a curated knowledge base.
            </p>
          </Piece>
        </Collage>

        <Column>
          {/* 4–5: summary */}
          <Block space="section">
            <Summary
              w={603}
              nowrap
              rows={[
                {
                  label: "Context",
                  value: "A new partnership would bring 100+ users we couldn't afford to support at current compute costs",
                },
                {
                  label: "Approach",
                  value: "Users were expensive because answers didn't fit their task, so they kept asking follow-ups",
                },
                {
                  label: "Outcome",
                  value: "Compute cost per task fell 30%, and we supported the partnership within budget",
                },
              ]}
            />
            <Figure
              src={summaryGantt}
              w={784}
              className="mx-auto mt-[clamp(1.75rem,3.33vw,3rem)] w-fit"
              alt="PolicyCopilot Gantt chart titled “Youth unemployment in Kenya”, with filters for issuing body and policy status, showing six policies as coloured bars from 2004 to present."
            />
          </Block>

          {/* 6 */}
          <Block space="chapter">
            <H2 w={1015}>A partnership bringing 100+ new users would have pushed compute costs over budget</H2>
            <P w={1015}>I worked with our engineering team to lower costs without making the product worse</P>
          </Block>

          {/* 7 */}
          <Block space="section">
            <H2 w={1015}>Making each answer less detailed was cheaper but would have backfired because</H2>
            <Highlight hug>thinner answers drive more follow-ups</Highlight>
            <P w={933}>
              If answers got thinner, we&apos;d lose the savings in volume while degrading the experience. Before cutting
              anything, I wanted to understand why users sent so many messages.
            </P>
          </Block>

          {/* 8–9 */}
          <Block space="section">
            <H2 w={933}>2/3 of messages came from 3 tasks where users had to piece text answers together themselves</H2>
            <P w={933}>
              With our data scientist, I analyzed 90 chat sessions and tagged each by what the user was trying to
              accomplish.
            </P>
            <Figure
              src={taskCards}
              w={1019}
              scrollMin={720}
              className="mt-[clamp(1.75rem,3.33vw,3rem)]"
              alt="Three staggered cards showing the three common tasks: Task 1, Mapping stakeholders (who is involved and how they connect); Task 2, Understanding current policies (what is active now and how it overlaps); Task 3, Reviewing past policies (what has been tried and when). Each card lists three example user questions as chat bubbles."
            />
          </Block>

          {/* 10 */}
          <Block space="section">
            <Columns cols={[464, 596]} gap={48}>
              <div>
                <H2 w={464}>
                  In 12 user interviews I led, users described asking follow-ups to retrieve dates, reformat lists, or
                  find which policies overlapped
                </H2>
                <Highlight>The answers had the information but not the shape they needed</Highlight>
              </div>
              <div>
                <Label>Sample: Getting the data to the correct “shape” took 4 turns</Label>
                <Figure
                  src={sampleChat}
                  w={596}
                  className="mt-1"
                  alt="Chat transcript in which a user needs four messages to get a usable answer: a request for a youth-unemployment policy timeline in Kenya returns long prose; follow-ups ask to list them by year, which overlapped in 2023 and 2024, and which are still active in 2026."
                />
              </div>
            </Columns>
          </Block>

          {/* 11 */}
          <Block space="chapter">
            <H2 w={935}>
              Visual answers cost more per message but less per task because one visual replaced on average 2-4
              follow-ups
            </H2>
            <P w={935}>
              Measured per message, visual answers looked like the wrong direction. Measured per completed task, they
              were cheaper.
            </P>
            <P w={935}>
              Users also told us visuals were easier to skim and made patterns visible faster. Some said visuals were a
              reason to choose PolicyCopilot over a general-purpose AI tool.
            </P>
          </Block>

          {/* 12–13 */}
          <Block space="section">
            <H2 w={933}>Showing high-value visuals by default and offering costly ones on request kept spending in check</H2>
            <P w={933}>
              With an engineer, I plotted each candidate content type by user value and expected compute cost:
            </P>
            <Figure
              src={quadrant}
              w={1209}
              scrollMin={820}
              className="mt-[clamp(1.75rem,3.33vw,3rem)]"
              alt="Quadrant chart plotting six candidate visual types by user value and compute cost, each with a photo of its paper sketch: Venn diagram and scatter plot (low value), flowchart (low cost), Euclidian graph (high value, high cost), and bubble chart and Gantt chart (high value, low cost). A hand-drawn green circle surrounds the bubble and Gantt charts: “These visuals were selected as the ones to build”."
            />
          </Block>

          {/* 14–16 */}
          <Block space="chapter">
            <H2 w={1197}>Each visual answered questions users previously needed several follow-ups to answer</H2>
          </Block>
          <Block space="double">
            <BeforeAfter
              prompt="“Show me policy timeline for youth unemployment in Kenya”"
              cols={[535, 577]}
              gap={85}
              before={{
                caption: "Text lists forced users to rebuild the timeline in their heads",
                src: beforeKenya,
                w: 407,
                alt: "Before: a text-only chat about Kenyan youth unemployment policy, where the user asks four successive questions and each answer is a paragraph or bulleted list.",
              }}
              after={{
                caption: "The Gantt chart makes order and overlap visible immediately",
                captionWidth: 549,
                src: afterKenya,
                w: 577,
                alt: "After: a single Gantt chart answer, “Youth unemployment in Kenya”, showing six policies as coloured bars from 2004 to present, so order and overlap are visible at a glance.",
              }}
            />
          </Block>
          <Block space="double">
            <BeforeAfter
              prompt="“What policies have impacted conservation in West Africa from 2016 onwards?”"
              // Figma uses an 85px gap above and 25px here; kept as designed.
              cols={[535, 577]}
              gap={25}
              before={{
                caption:
                  "Text responses did not reveal patterns and required a new followup question to obtain new information",
                src: beforeWestAfrica,
                w: 407,
                alt: "Before: a text-only chat about West African conservation policy since 2016, where the user asks three successive questions and receives long paragraphs each time.",
              }}
              after={{
                caption:
                  "Sizing bubbles by funding received showed which projects attract funders without users comparing figures",
                captionWidth: 549,
                src: afterWestAfrica,
                w: 577,
                alt: "After: a bubble chart titled “Conservation in West Africa” plotting projects by approval date and relevancy, with bubbles sized by funding and coloured by issuing body.",
              }}
            />
          </Block>

          {/* 17 */}
          <Block space="chapter">
            <H2 w={922}>
              Cost per task dropped 30% while task completion held steady, so we could onboard all 100+ partnership
              users
            </H2>
            <div className="mt-[clamp(1.75rem,3.33vw,3rem)]">
              <Stats
                title="Stats"
                items={[
                  { value: "-30%", label: "change in compute cost per task" },
                  { value: "6 → 2", label: "average messages per task", labelWidth: 140 },
                  {
                    value: "+45%",
                    muted: true,
                    label: (
                      <>
                        cost per message
                        <br />
                        (accepted trade-off)
                      </>
                    ),
                  },
                ]}
              />
            </div>
          </Block>

          {/* 18 */}
          <Block space="section">
            <H2 w={922}>The cheapest AI answer is the one that finishes the task in the fewest turns</H2>
            <P w={877}>
              If I did this again, I&apos;d measure task success from the beginning rather than relying on message count,
              since fewer messages can also mean users gave up. Next, I&apos;d explore extending the approach to other task
              types.
            </P>
          </Block>

          {/* 19 */}
          <Block space="chapter">
            <NextProject
              href="/work/thought-partner/"
              title={
                <>
                  Turning an AI black box into a thought partner:
                  <br />
                  drop-off from 70% to 20%
                </>
              }
              tag="AI product design"
              src={nextProject}
              alt="Preview of the thought-partner case study: a PolicyCopilot chat asking clarifying questions about youth unemployment in Pakistan."
            />
          </Block>
        </Column>
      </main>
      <Footer overlap />
    </>
  );
}

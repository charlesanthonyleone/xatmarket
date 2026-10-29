import { Invite } from './ui.jsx'
export default function IdeasInvite({ image = 'pg_ideas' }) {
  return <Invite image={image} kicker="Claim a seat" title="Want to run one of these?"
    text="Come to the Market chat and tell us which project interests you and what you can do. Charles builds these platforms personally and needs active managers and staff to operate them. Serious inquiries only: these become registered businesses, and the people who run them grow with them."
    cta="Talk to Market staff" note="Opens the Market chat in a new tab. Pay and roles are agreed per project—nothing is promised up front." />
}

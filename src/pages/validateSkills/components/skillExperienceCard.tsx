type Props = {
  skill_level: number;
};

export function SkillExperienceCard({ skill_level }: Props) {
  return (
    <>
      {skill_level === 1 && <p>0 - 6 months</p>}
      {skill_level === 2 && <p>6 - 12 months</p>}
      {skill_level === 3 && <p>1 - 2 years</p>}
      {skill_level === 4 && <p>2 - 4 years</p>}
      {skill_level === 5 && <p>4 - 7 years</p>}
      {skill_level === 5 && <p>over 7 years</p>}
    </>
  );
}

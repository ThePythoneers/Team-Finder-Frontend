type Props = {
  skill_level: number;
};

export function SkillLevelCard({ skill_level }: Props) {
  return (
    <>
      {skill_level === 1 && <p>{skill_level} - Learns</p>}
      {skill_level === 2 && <p>{skill_level} - Knows</p>}
      {skill_level === 3 && <p>{skill_level} - Does</p>}
      {skill_level === 4 && <p>{skill_level} - Helps</p>}
      {skill_level === 5 && <p>{skill_level} - Teaches</p>}
    </>
  );
}

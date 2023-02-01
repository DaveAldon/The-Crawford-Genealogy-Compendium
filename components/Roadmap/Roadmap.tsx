enum SkillType {
  COMPLETED = 'bg-green-100 text-green-800',
  INCOMPLETE = 'bg-red-100 text-red-800',
}

interface ISkillData {
  title: string;
  tasks: string[];
  color: SkillType;
}

const SkillData: ISkillData[] = [
  {
    title: '2022 Q4',
    tasks: [
      'Publish website with navigable Family Tree',
      `Add family information from Irene Mosher's research documents`,
      'Provide a small sample of film, photo, and artifact information for family members in the tree',
    ],
    color: SkillType.COMPLETED,
  },
  {
    title: `2023 Q1`,
    tasks: [
      'Add advanced view for detailed family member information, which can be linked to directly',
      'Add a military view to see detailed information about the military service of a family member',
      'Create a newsletter',
      'Create a feed to browse artifacts, photos, and movies without needing a reference to the tree',
      'Add connections to William Wallace and William H. Crawford',
      'Add a Crawford family history writeup, including the Coat of Arms and arrival to the United States',
    ],
    color: SkillType.INCOMPLETE,
  },
  {
    title: '2023 Q2',
    tasks: [
      'Add major extended families to tree (namely Olson & Kerr)',
      'Add integrations with other genealogy services, such as Find A Grave',
      'Add a query system to find interesting demographics such as "show all military family members" or "show all people born in the 1800s"',
    ],
    color: SkillType.INCOMPLETE,
  },
  {
    title: '2023 Q3',
    tasks: [
      'Add a way for anyone to request changes to the tree',
      'Add a feed that shows things that happened on the current day in history',
    ],
    color: SkillType.INCOMPLETE,
  },
];

const Category = ({ skill }: { skill: ISkillData }) => {
  const { title, tasks, color } = skill;
  return (
    <div className="mb-10">
      <h2 className="font-medium title-font tracking-widest mb-4 text-sm text-center sm:text-left text-white">
        {title}
      </h2>
      <nav className="flex flex-col sm:items-start sm:text-left text-center items-center space-y-2.5">
        {tasks.map((task, index) => (
          <Task name={task} color={color} key={index} />
        ))}
      </nav>
    </div>
  );
};

const Task = ({ name, color }: { name: string; color: SkillType }) => {
  return (
    <div className="flex flex-row items-baseline">
      <span
        className={`${color} w-4 h-4 mr-2 rounded-full inline-flex items-center justify-center`}>
        <svg
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="3"
          className="w-3 h-3"
          viewBox="0 0 24 24">
          <path d="M20 6L9 17l-5-5"></path>
        </svg>
      </span>
      <p
        style={{
          width: '200px',
        }}
        className="break-normal">
        {name}
      </p>
    </div>
  );
};

export const Roadmap = () => {
  return (
    <section className="text-white body-font ">
      <div className="flex flex-wrap gap-10 w-full justify-center items-start">
        {SkillData.map((skill, index) => (
          <Category skill={skill} key={index} />
        ))}
      </div>
    </section>
  );
};

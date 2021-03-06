import fetch from "node-fetch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiscord } from "@fortawesome/free-brands-svg-icons";
import { motion } from "framer-motion";

export default function Home({ branches }) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 50 },
    show: {
      opacity: 1,
      y: 0,
    },
  };

  const yellowBlock = {
    hidden: { opacity: 0, x: -50 },
    show: { opacity: 1, x: 0 },
  };

  const grayBlock = {
    hidden: { opacity: 0, x: 50 },
    show: { opacity: 1, x: 0 },
  };

  return (
    <motion.main
      variants={container}
      initial="hidden"
      animate="show"
      className="container mx-auto pb-16 px-4"
    >
      {/* Logo */}
      <motion.img
        variants={item}
        src="/branches-logo.svg"
        className="mx-auto max-w-2xl"
        alt="Pitt CSC Branches"
      />
      <div className="flex flex-col justify-center space-y-8 lg:flex-row lg:gap-8 lg:space-y-0">
        {/* Yellow Description Block */}
        <motion.div
          variants={yellowBlock}
          className="mx-auto p-8 max-w-2xl leading-loose bg-secondary-200 rounded-lg shadow-md"
        >
          <h2 className="mb-4 text-2xl font-bold md:text-3xl lg:text-4xl">
            What are branches?{" "}
            <span className="inline-block transform hover:-rotate-6 hover:scale-110 transition">
              🤔
            </span>
          </h2>
          <p>
            {/* Avoid react/no-unescaped-entities
          https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-unescaped-entities.md */}
            {`CSC Branches is CSC's initiative to further develop the SCI
            community and foster more niche interests within. Through this
            program, CSC members are able to easily create and manage their
            own communities (called "Branches") by forgoing SCI and SORC
            bureaucracy via CSC. This allows club founders, open source
            projects, and small interest groups to focus less on monotonous
            paperwork and slow processes, and more on what matters - their
            community, passions, missions, and members.`}
          </p>
        </motion.div>
        {/* Gray Links Block */}
        <motion.div
          variants={grayBlock}
          className="a grid justify-items-start place-content-center mx-auto p-8 max-w-xl leading-loose bg-gray-100 rounded-lg shadow-md space-y-2"
        >
          <h2 className="mb-4 text-2xl font-bold md:text-3xl lg:text-4xl">
            Links to sites{" "}
            <span className="inline-block transform hover:rotate-6 hover:scale-110 transition">
              🔗
            </span>
          </h2>
          <ul className="flex flex-col items-start justify-center space-y-4">
            {branches.map((branch, i) => (
              <li key={i}>
                <a
                  href={branch.url}
                  className="text-primary hover:underline font-bold"
                >
                  {branch.name}
                </a>
                <div>{branch.description ? `${branch.description}` : null}</div>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
      {/* Join Discord Blurb */}
      <motion.div
        variants={item}
        className="flex items-center justify-center mt-16 text-center space-x-2"
      >
        <p>
          Join our{" "}
          <a
            href="https://discord.gg/wzPeq2GCRT"
            className="text-primary hover:underline font-bold"
          >
            Discord
          </a>
          {/* Avoid react/no-unescaped-entities
          https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-unescaped-entities.md */}
          {`, that's where you can find them!`}
        </p>
        <a
          href="https://discord.gg/wzPeq2GCRT"
          className="block text-primary text-4xl transform hover:scale-105 transition"
        >
          <FontAwesomeIcon icon={faDiscord} />
        </a>
      </motion.div>
    </motion.main>
  );
}

export async function getStaticProps() {
  let branchesRepos = await (
    await fetch("https://api.github.com/orgs/pittcsc-branches/repos")
  ).json();

  // Filter out the homepage from the list.
  branchesRepos = branchesRepos.filter(
    (branchesRepo) => !branchesRepo.name.includes(".github.io")
  );

  return {
    props: {
      branches: branchesRepos.map((branchRepo) => ({
        url: `https://branches.pittcsc.org/${branchRepo.name}`,
        name: branchRepo.name,
        description: branchRepo.description,
      })),
    },
  };
}

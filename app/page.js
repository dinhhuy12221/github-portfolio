import { userData } from "../data/user-data";
import Contributions from "./components/contributions";
import HeroSection from "./components/hero-section";
import GitLanguage from "./components/language";
import Projects from "./components/projects";
import Rank from "./components/rank";
import GitStats from "./components/stats";
import SetFavicon from "./components/SetFavicon";

async function getGitProfile() {
  const res = await fetch(
    `https://api.github.com/users/${userData.githubUser}`, { cache: "no-store" }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return await res.json();
}

async function getGitProjects() {
  const res = await fetch(
    `https://api.github.com/users/${userData.githubUser}/repos?sort=created&direction=desc&per_page=10`, { cache: "no-store" }
  );
  // const res = await fetch(`https://api.github.com/search/repositories?q=user:${userData.githubUser}+fork:false&sort=stars&per_page=10&type=Repositories`)

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return await res.json();
}

export default async function Home() {
  const profile = await getGitProfile();
  const projects = await getGitProjects();

  return (
    <>
      <SetFavicon iconUrl={profile.avatar_url} />

      <HeroSection profile={profile} />
      <GitStats />
      <Projects
        projects={projects}
        // projects={projects.items}
        profile={profile}
      />
      <GitLanguage />
      <Rank />
      <Contributions />
    </>
  );
}

export async function generateMetadata({ params, searchParams }, parent) {
  const profile = await getGitProfile();

  return {
    title: `GitHub Profile of ${profile.name}`,
    description: profile.description,
  };
}

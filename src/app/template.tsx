// App Router template: re-mounts on every navigation, so the CSS keyframe
// fires fresh on each route change. Gives mobile (esp. iOS Safari) a smooth
// fade-in that masks the perceived "pop-in" while subtrees hydrate.
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-enter">{children}</div>;
}

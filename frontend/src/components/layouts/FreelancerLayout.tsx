import FreelancerSidebar from "@/components/FreelancerSidebar";

const FreelancerLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex">
      <FreelancerSidebar />
      <main className="flex-1 ml-64 p-6">{children}</main>
    </div>
  );
};

export default FreelancerLayout;

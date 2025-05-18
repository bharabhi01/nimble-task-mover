
import TaskBoard from "@/components/TaskBoard";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-sm rounded-lg p-6">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Task Management Board</h1>
          </div>
          <TaskBoard />
        </div>
      </div>
    </div>
  );
};

export default Index;

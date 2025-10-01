import AddTask from "@/components/AddTask.jsx";
import DateTimeFilter from "@/components/DateTimeFilter.jsx";
import Footer from "@/components/Footer.jsx";
import Header from "@/components/Header";
import StatsAndFIlters from "@/components/StatsAndFIlters.jsx";
import TaskList from "@/components/TaskList.jsx";
import TaskListPagination from "@/components/TaskListPagination.jsx";
import api from "@/lib/axios";
import { visibleTaskLimit } from "@/lib/data";
import { useEffect, useState } from "react";
import { toast } from "sonner";


export default function HomePage() {
    const [taskBuffer, settaskBuffer] = useState([]);
    const [activeTaskCount, setActiveTaskCount] = useState(0)
    const [completedTaskCount, setCompletedTaskCount] = useState(0);
    const [filter, setFilter] = useState("all");
    const [dateQuery, setDateQuery] = useState('today');
    const [page, setPage] = useState(1)

    async function fetchTask() {
        try {
            const res = await api.get(`/tasks?filter=${dateQuery}`);
            settaskBuffer(res.data.tasks);
            setActiveTaskCount(res.data.activeCount);
            setCompletedTaskCount(res.data.completeCount)
        } catch (error) {
            console.error('Loi khi lay tasks:', error)
            toast.error('Loi xay ra khi truy xuat task')
        }

    }
    //bien
    const filteredTasks = taskBuffer.filter((task) => {
        switch (filter) {
            case 'active':
                return task.status === 'active'
            case 'completed':
                return task.status === 'complete';
            case 'all':
                return true;

        }

    })
    const visibleTask = filteredTasks.slice(
        (page - 1) * visibleTaskLimit,
        page * visibleTaskLimit
    );
    if (visibleTask.length === 0) {
        handlePrev()
    }
    function handleTaskChanged() {
        fetchTask();
    }
    const totalPages = Math.ceil(filteredTasks.length / visibleTaskLimit);

    const handleNext = () => {
        if (page < totalPages) {
            setPage((prev) => prev + 1)
        }
    }
    const handlePrev = () => {
        if (page > 1) {
            setPage((prev) => prev - 1)
        }
    }
    const handlePageChange = (newPage) => {
        setPage(newPage)
    }
    useEffect(() => { fetchTask() }
        , [dateQuery])
    useEffect(() => {
        setPage(1)
    }, [filter, dateQuery])
    return (
        <div className="min-h-screen w-full bg-white relative">
            {/* Dual Gradient Overlay (Top) Background */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: `
        linear-gradient(to right, rgba(229,231,235,0.8) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(229,231,235,0.8) 1px, transparent 1px),
        radial-gradient(circle 500px at 0% 20%, rgba(139,92,246,0.3), transparent),
        radial-gradient(circle 500px at 100% 0%, rgba(59,130,246,0.3), transparent)
      `,
                    backgroundSize: "48px 48px, 48px 48px, 100% 100%, 100% 100%",
                }}
            />
            {/* Your Content/Components */}

            <div className="container pt-8 mx-auto" >
                <div className="w-full max-w-2xl p-6 mx-auto space-y-6 z-10 relative ">
                    <Header />
                    <AddTask handleNewTaskAdded={handleTaskChanged} />
                    <StatsAndFIlters
                        filter={filter}
                        setFilter={setFilter}
                        activeTaskCount={activeTaskCount}
                        completedTaskCount={completedTaskCount}
                    />
                    <TaskList filteredTasked={visibleTask} filter={filter} handleTaskChanged={handleTaskChanged} />
                    <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
                        <TaskListPagination
                            handleNext={handleNext}
                            handlePrev={handlePrev}
                            handlePageChange={handlePageChange}
                            page={page}
                            totalPages={totalPages}
                        />
                        <DateTimeFilter dateQuery={dateQuery} setDateQuery={setDateQuery} />
                    </div>
                    <Footer activeTaskCount={activeTaskCount} completedTaskCount={completedTaskCount} />
                </div>
            </div>
        </div>
    )
}


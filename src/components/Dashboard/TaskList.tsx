import React from 'react';
import { cn } from '@/lib/utils';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Settings, Plus, GripVertical } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface Task {
  id: string;
  label: string;
  completed: boolean;
  dueDate?: string;
}

const initialTasks: Task[] = [
  { id: '1', label: 'Review and make sure nothing slips through cracks', completed: true, dueDate: '15 Sep, 2021' },
  { id: '2', label: 'Send meeting invites for sales upcampaign', completed: false, dueDate: '20 Sep, 2021' },
  { id: '3', label: 'Weekly closed sales won checking with sales team', completed: false, dueDate: '24 Sep, 2021' },
  { id: '4', label: 'Add notes that can be viewed from the individual view', completed: true, dueDate: '27 Sep, 2021' },
  { id: '5', label: 'Move stuff to another page', completed: false, dueDate: '30 Sep, 2021' },
  { id: '6', label: 'Prepare presentation for Q4 review', completed: false, dueDate: '05 Oct, 2021' },
  { id: '7', label: 'Follow up with lead from conference', completed: true, dueDate: '10 Oct, 2021' },
  { id: '8', label: 'Update CRM with new contacts', completed: false, dueDate: '12 Oct, 2021' },
  { id: '9', label: 'Plan team building activity', completed: false, dueDate: '15 Oct, 2021' },
  { id: '10', label: 'Finalize budget for next project', completed: true, dueDate: '18 Oct, 2021' },
];

interface TaskListProps {
  className?: string;
}

const TaskList: React.FC<TaskListProps> = ({ className }) => {
  const [tasks, setTasks] = React.useState<Task[]>(initialTasks);

  const toggleTask = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const completedTasks = tasks.filter((task) => task.completed).length;
  const totalTasks = tasks.length;
  const progressPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  return (
    <Card className={cn('h-full flex flex-col', className)}>
      <CardHeader className="flex flex-row items-start justify-between">
        <div>
          <CardTitle className="text-lg font-semibold">My Tasks</CardTitle>
          <CardDescription className="text-xs text-muted-foreground">
            {completedTasks} of {totalTasks} remaining
          </CardDescription>
        </div>
        <div className="flex items-center gap-1">
             <Button variant="default" size="sm" className="h-8 bg-green-500 hover:bg-green-600 text-white">
                <Plus className="mr-1.5 h-3.5 w-3.5" /> Add Task
            </Button>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Settings className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem>Sort by Due Date</DropdownMenuItem>
                    <DropdownMenuItem>Sort by Completion</DropdownMenuItem>
                    <DropdownMenuItem>Clear Completed</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="flex-grow overflow-y-auto pr-3 pl-1 py-0">
        <Progress value={progressPercentage} className="mb-4 h-1.5" />
        <ul className="space-y-3">
          {tasks.map((task) => (
            <li key={task.id} className="flex items-center justify-between p-2 rounded-md hover:bg-muted/50 group">
              <div className="flex items-center">
                <Checkbox
                  id={`task-${task.id}`}
                  checked={task.completed}
                  onCheckedChange={() => toggleTask(task.id)}
                  className="mr-3 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                />
                <label
                  htmlFor={`task-${task.id}`}
                  className={cn(
                    'text-sm font-medium leading-none',
                    task.completed ? 'line-through text-muted-foreground' : 'text-foreground'
                  )}
                >
                  {task.label}
                </label>
              </div>
              <div className="flex items-center">
                {task.dueDate && (
                  <span className={cn('text-xs mr-2', task.completed ? 'text-muted-foreground' : 'text-slate-500')}>{task.dueDate}</span>
                )}
                <GripVertical className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 cursor-grab transition-opacity" />
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default TaskList;

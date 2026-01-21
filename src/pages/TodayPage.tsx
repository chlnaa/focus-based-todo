import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import type { Todo } from '@/types/types';
import dayjs from 'dayjs';
import { useState } from 'react';
import { Trash2, Pencil, Clock4, CircleCheck, ListTodo } from 'lucide-react';
import { useSelectedDate, useSetSelectedDate } from '@/stores/useTodoStore';

export default function TodayPage() {
  const selectedDate = useSelectedDate();
  const setSelectedDate = useSetSelectedDate();

  const [viewDate, setViewDate] = useState(dayjs(selectedDate));

  const mockTodos: Todo[] = [
    {
      id: '1',
      text: "Finish Today's UI",
      date: dayjs().format('YYYY-MM-DD'),
      createdAt: Date.now(),
      status: 'active',
      totalFocusTime: 0,
    },
    {
      id: '2',
      text: 'Study shadcn/ui components',
      date: dayjs().format('YYYY-MM-DD'),
      createdAt: Date.now(),
      status: 'completed',
      totalFocusTime: 0,
    },
    {
      id: '3',
      text: 'Push code to GitHub',
      date: dayjs().format('YYYY-MM-DD'),
      createdAt: Date.now(),
      status: 'active',
      totalFocusTime: 0,
    },
  ];

  const currentMonth = viewDate.format('MMM');
  const startOfWeek = viewDate.startOf('week');

  const daysInWeek = Array.from({ length: 7 }, (_, i) => {
    const date = startOfWeek.add(i, 'day');
    const fullDate = date.format('YYYY-MM-DD');
    return {
      dayName: date.format('ddd'),
      dateNumber: date.date(),
      fullDate,
      isSelected: fullDate === selectedDate,
      isToday: fullDate === dayjs().format('YYYY-MM-DD'),
    };
  });

  const handleGoToday = () => {
    const today = dayjs();
    setViewDate(today);
    setSelectedDate(today.format('YYYY-MM-DD'));
  };

  const handleGoPrevWeek = () =>
    setViewDate((prev) => prev.subtract(1, 'week'));

  const handleGoNextWeek = () => setViewDate((prev) => prev.add(1, 'week'));

  const totalCount = mockTodos.length;
  const completedCount = mockTodos.filter(
    (t) => t.status === 'completed',
  ).length;
  const completedRate =
    totalCount > 0 ? Math.floor((completedCount / totalCount) * 100) : 0;

  return (
    <div className="flex flex-col m-auto w-full max-w-175 mt-7">
      <section>
        <div className="flex items-center gap-6">
          <div>
            <Button
              className="h-7 p-2 text-xs font-medium border-gray-300"
              variant="outline"
              size="sm"
              onClick={handleGoToday}
            >
              Today
            </Button>
            <Button
              className="cursor-pointer text-xl ml-2"
              variant={'ghost'}
              onClick={handleGoPrevWeek}
            >
              {'<'}
            </Button>
            <Button
              className="cursor-pointer text-xl"
              variant={'ghost'}
              onClick={handleGoNextWeek}
            >
              {'>'}
            </Button>
          </div>
          <h2 className="text-3xl font-bold text-center">{currentMonth}</h2>
        </div>

        <ul className="flex justify-between items-center p-3">
          {daysInWeek.map((day) => (
            <li key={day.fullDate} className="text-center">
              <div>{day.dayName}</div>
              <Button
                className={`text-xl transition-all ${day.isSelected ? 'p-4 text-2xl' : 'text-gray-600'}`}
                variant={day.isSelected ? 'default' : 'ghost'}
                onClick={() => setSelectedDate(day.fullDate)}
              >
                {day.dateNumber}
              </Button>
            </li>
          ))}
        </ul>
      </section>

      <section className="flex justify-between items-center py-2 px-3 m-3">
        <div>
          <h3>Total Focus Time</h3>
          <div className="flex gap-2">
            <Clock4 />
            <span>00:00</span>
          </div>
        </div>

        <div>
          <h3>Complete Rate</h3>
          <div className="flex gap-2">
            <CircleCheck />
            <span>{`${completedRate}%`}</span>
          </div>
        </div>

        <div>
          <h3>Task Completed</h3>
          <div className="flex gap-2">
            <ListTodo />
            <span>{`${completedCount}/${totalCount}`}</span>
          </div>
        </div>
      </section>

      <section>
        <div className="flex">
          <Input />
          <Button>Add</Button>
        </div>
        <ul className="mt-3 ">
          {mockTodos.map((todo) => (
            <li
              key={todo.id}
              className="flex flex-col justify-between items-center p-2 border-2 rounded-xl gap-3 mb-5"
            >
              <div className="flex justify-between items-center w-full">
                <div>
                  <Checkbox />
                  <span className="p-2">{todo.text}</span>
                </div>
                <div>
                  <Button variant={'ghost'}>
                    <Pencil />
                  </Button>
                  <Button variant={'ghost'}>
                    <Trash2 />
                  </Button>
                </div>
              </div>
              <div className="flex justify-end items-center w-full">
                <div className="mr-5">hh:mm</div>
                <Button>startFocus</Button>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

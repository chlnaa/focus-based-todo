import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import type { Todo } from '@/types/types';
import dayjs from 'dayjs';
import { useState } from 'react';
import { Trash2, Pencil } from 'lucide-react';

export default function TodayPage() {
  const [viewDate, setViewDate] = useState(dayjs());
  void setViewDate;

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
    return {
      dayName: date.format('ddd'),
      dateNumber: date.date(),
      fullDate: date.format('YYYY-MM-DD'),
    };
  });

  return (
    <div className="flex flex-col m-auto w-full max-w-175 mt-7">
      <section>
        <div className="text-3xl font-bold text-center">{currentMonth}</div>

        <ul className="flex justify-between items-center p-3">
          <Button className="cursor-pointer  text-2xl" variant={'ghost'}>
            {'<'}
          </Button>
          {daysInWeek.map((day) => (
            <li key={day.fullDate} className="text-center">
              <div>{day.dayName}</div>
              <Button className="text-xl" variant={'ghost'}>
                {day.dateNumber}
              </Button>
            </li>
          ))}
          <Button className="cursor-pointer text-2xl" variant={'ghost'}>
            {'>'}
          </Button>
        </ul>
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

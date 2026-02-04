import { useEffect, useRef } from 'react';
import type { ChartData } from '@/types/types';
import * as d3 from 'd3';
import dayjs from 'dayjs';

interface BarChartProps {
  data: ChartData[];
  baseDate: dayjs.Dayjs;
}

export default function FocusTimeBarChart({ data, baseDate }: BarChartProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const margin = { top: 10, right: 10, bottom: 20, left: 40 };
    const width = 250 - margin.left - margin.right;
    const height = 150 - margin.top - margin.bottom;

    d3.select(svgRef.current).selectAll('*').remove();

    const svg = d3
      .select(svgRef.current)
      .attr(
        'viewBox',
        `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`,
      )
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    const weekDays = Array.from({ length: 7 }, (_, i) =>
      baseDate.add(i, 'day').startOf('day').toDate(),
    );

    const x = d3
      .scaleBand<Date>()
      .domain(weekDays)
      .range([0, width])
      .padding(0.3);

    const maxMinutes = d3.max(data, (d) => d.totalMinutes) || 60;

    const y = d3
      .scaleLinear()
      .domain([0, maxMinutes + 10])
      .range([height, 0])
      .nice();

    svg
      .append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(
        d3 //
          .axisBottom<Date>(x)
          .tickFormat(d3.timeFormat('%a'))
          .tickSizeOuter(0),
      )
      .selectAll('text')
      .style('font-size', '10px');

    svg
      .append('g')
      .call(
        d3
          .axisLeft<number>(y)
          .ticks(5)
          .tickFormat((d) => {
            if (d > 60) {
              const hours = (d / 60).toFixed(1);
              return `${hours.replace('.0', '')}h`;
            }
            return `${d}m`;
          })
          .tickSizeOuter(0),
      )
      .selectAll('text')
      .style('font-size', '10px');

    if (data.length > 0) {
      svg
        .selectAll('.bar')
        .data(data)
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('x', (d) => x(dayjs(d.date).startOf('day').toDate()) || 0)
        .attr('y', (d) => y(d.totalMinutes))
        .attr('width', x.bandwidth())
        .attr('height', (d) => height - y(d.totalMinutes))
        .attr('fill', '#3b82f6')
        .attr('rx', 2);
    }
  }, [data, baseDate]);

  return (
    <div className="w-fit max-w-[300] bg-card rounded-2xl border-2 p-4 my-4 shadow-sm">
      <h3 className="text-lg font-bold text-center mb-4 ml-2">
        {`⏱️ Weekly Focus Time`}
      </h3>
      <svg ref={svgRef} className="w-full h-auto" />
    </div>
  );
}

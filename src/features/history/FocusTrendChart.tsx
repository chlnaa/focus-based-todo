import type { ChartData } from '@/types/types';
import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import type dayjs from 'dayjs';

interface TrendChartProps {
  data: ChartData[];
  baseDate: dayjs.Dayjs;
}

export default function FocusTrendChart({ data, baseDate }: TrendChartProps) {
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

    const x = d3
      .scaleTime()
      .domain([
        baseDate.startOf('week').toDate(),
        baseDate.endOf('week').startOf('day').toDate(),
      ])
      .range([0, width]);

    const y = d3 //
      .scaleLinear()
      .domain([0, 100])
      .range([height, 0])
      .nice();

    const weekDays = Array.from({ length: 7 }, (_, i) =>
      baseDate.add(i, 'day').startOf('day').toDate(),
    );

    svg
      .append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(
        d3
          .axisBottom<Date>(x)
          .tickValues(weekDays)
          .tickFormat(d3.timeFormat('%a'))
          .tickSizeOuter(0),
      )
      .selectAll('text')
      .style('font-size', '10px')
      .attr('dx', '-2px');

    svg
      .append('g') //
      .call(
        d3
          .axisLeft<number>(y)
          .ticks(5)
          .tickFormat((d) => `${d}%`)
          .tickSizeOuter(0),
      )
      .selectAll('text')
      .style('font-size', '10px')
      .attr('dx', '-2px');

    if (data.length > 0) {
      const line = d3
        .line<ChartData>()
        .x((d) => x(new Date(d.date)))
        .y((d) => y(d.completionRate))
        .curve(d3.curveMonotoneX);

      svg
        .append('path')
        .datum(data)
        .attr('fill', 'none')
        .attr('stroke', '#10b981')
        .attr('stroke-width', 2)
        .attr('d', line);

      svg
        .selectAll('.dot')
        .data(data)
        .enter()
        .append('circle')
        .attr('cx', (d) => x(new Date(d.date)))
        .attr('cy', (d) => y(d.completionRate))
        .attr('r', 3)
        .attr('fill', '#10b981');
    }
  }, [data, baseDate]);

  return (
    <div className="w-fit max-w-[300] bg-card rounded-2xl border-2 p-4 my-4 shadow-sm">
      <h3 className="text-lg font-bold text-center mb-4 ml-2">
        📊 Weekly Completion Trend
      </h3>
      <svg ref={svgRef} className="w-full h-auto" />
    </div>
  );
}

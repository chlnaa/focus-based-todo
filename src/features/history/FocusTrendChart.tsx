import type { ChartData } from '@/types/types';
import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

export default function FocusTrendChart({ data }: { data: ChartData[] }) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || data.length === 0) return;

    const margin = { top: 10, right: 10, bottom: 20, left: 35 };
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
      .domain(d3.extent(data, (d) => d.date) as [Date, Date])
      .range([0, width]);

    const y = d3.scaleLinear().domain([0, 100]).range([height, 0]);

    svg
      .append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(
        d3
          .axisBottom(x)
          .ticks(5)
          .tickFormat(d3.timeFormat('%m/%d') as any),
      )
      .selectAll('text')
      .style('font-size', '9px')
      .attr('dx', '-2px');

    svg
      .append('g') //
      .call(
        d3
          .axisLeft(y)
          .ticks(5)
          .tickFormat((d) => `${d}%`),
      )
      .selectAll('text')
      .style('font-size', '9px')
      .attr('dx', '-2px');

    const line = d3
      .line<ChartData>()
      .x((d) => x(d.date))
      .y((d) => y(d.completionRate))
      .curve(d3.curveMonotoneX);

    svg
      .append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', '#10b981')
      .attr('stroke-width', 2)
      .attr('d', line);
  }, [data]);

  return (
    <div className="w-fit max-w-[300] bg-card rounded-2xl border-2 p-4 my-4 shadow-sm">
      <h3 className="text-lg font-bold text-center mb-4 ml-2">
        📊 Monthly Completion Trend
      </h3>
      <svg ref={svgRef} className="w-full h-auto" />
    </div>
  );
}

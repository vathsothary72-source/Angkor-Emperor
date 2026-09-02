import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { ThreatLog } from '../types';

interface ThreatNetworkGraphProps {
  threats: ThreatLog[];
}

interface GraphNode extends d3.SimulationNodeDatum {
  id: string;
  type: 'CORE' | 'THREAT';
  severity?: string;
  radius: number;
}

interface GraphLink extends d3.SimulationLinkDatum<GraphNode> {
  source: string;
  target: string;
}

export const ThreatNetworkGraph: React.FC<ThreatNetworkGraphProps> = ({ threats }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = 400;

    // Clear previous SVG contents
    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height]);

    // Graph Data Preparation
    // Core defense node
    const nodes: GraphNode[] = [{
      id: 'CORE',
      type: 'CORE',
      radius: 30,
      x: width / 2,
      y: height / 2
    }];

    const links: GraphLink[] = [];

    // Limit to latest 30 threats for performance and visual clarity
    const recentThreats = threats.slice(-30);

    recentThreats.forEach(threat => {
      // Check if node already exists (e.g., aggregate by IP)
      let existingNode = nodes.find(n => n.id === threat.ip);
      if (!existingNode) {
        existingNode = {
          id: threat.ip,
          type: 'THREAT',
          severity: threat.severity,
          radius: 12 + (threat.severity === 'critical' ? 8 : threat.severity === 'high' ? 4 : 0),
          // Start threats from edges
          x: Math.random() > 0.5 ? Math.random() * width : (Math.random() > 0.5 ? 0 : width),
          y: Math.random() > 0.5 ? Math.random() * height : (Math.random() > 0.5 ? 0 : height)
        };
        nodes.push(existingNode);
        links.push({
          source: existingNode.id,
          target: 'CORE'
        });
      }
    });

    // Force Simulation
    const simulation = d3.forceSimulation<GraphNode>(nodes)
      .force("link", d3.forceLink<GraphNode, GraphLink>(links).id(d => d.id).distance(120).strength(0.5))
      .force("charge", d3.forceManyBody().strength(-200))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collide", d3.forceCollide<GraphNode>().radius(d => d.radius + 5).iterations(2));

    // Glow effects definition
    const defs = svg.append("defs");
    
    // Core glow
    const coreGlow = defs.append("radialGradient")
      .attr("id", "core-glow")
      .attr("cx", "50%")
      .attr("cy", "50%")
      .attr("r", "50%");
    coreGlow.append("stop").attr("offset", "0%").attr("stop-color", "#E0FF00").attr("stop-opacity", 1);
    coreGlow.append("stop").attr("offset", "100%").attr("stop-color", "#E0FF00").attr("stop-opacity", 0);

    // Threat glows based on severity
    const criticalGlow = defs.append("radialGradient").attr("id", "critical-glow");
    criticalGlow.append("stop").attr("offset", "0%").attr("stop-color", "#FF3B30").attr("stop-opacity", 1);
    criticalGlow.append("stop").attr("offset", "100%").attr("stop-color", "#FF3B30").attr("stop-opacity", 0);

    const highGlow = defs.append("radialGradient").attr("id", "high-glow");
    highGlow.append("stop").attr("offset", "0%").attr("stop-color", "#F97316").attr("stop-opacity", 1);
    highGlow.append("stop").attr("offset", "100%").attr("stop-color", "#F97316").attr("stop-opacity", 0);

    const getGlow = (severity?: string) => {
      if (severity === 'critical') return "url(#critical-glow)";
      if (severity === 'high') return "url(#high-glow)";
      return "#EAB308"; // medium/low fallback
    };

    // Draw Links
    const link = svg.append("g")
      .attr("stroke-opacity", 0.6)
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke", (d) => {
         const sourceNode = typeof d.source === 'string' ? nodes.find(n => n.id === d.source) : d.source;
         return sourceNode?.severity === 'critical' ? 'rgba(255, 59, 48, 0.5)' : 'rgba(224, 255, 0, 0.3)';
      })
      .attr("stroke-width", d => {
        const sourceNode = typeof d.source === 'string' ? nodes.find(n => n.id === d.source) : d.source;
        return sourceNode?.severity === 'critical' ? 3 : 1;
      });

    // Animate defensive strikes along the links
    const strikeLayer = svg.append("g").attr("class", "strikes");
    
    // Draw Nodes
    const nodeGroup = svg.append("g")
      .selectAll("g")
      .data(nodes)
      .join("g")
      .call(d3.drag<SVGGElement, GraphNode>()
        .on("start", (event, d) => {
          if (!event.active) simulation.alphaTarget(0.3).restart();
          d.fx = d.x;
          d.fy = d.y;
        })
        .on("drag", (event, d) => {
          d.fx = event.x;
          d.fy = event.y;
        })
        .on("end", (event, d) => {
          if (!event.active) simulation.alphaTarget(0);
          d.fx = null;
          d.fy = null;
        })
      );

    // Outer glow for nodes
    nodeGroup.append("circle")
      .attr("r", d => d.radius * 1.8)
      .attr("fill", d => d.type === 'CORE' ? "url(#core-glow)" : getGlow(d.severity))
      .attr("opacity", d => d.type === 'CORE' ? 0.3 : 0.4);

    // Inner core for nodes
    nodeGroup.append("circle")
      .attr("r", d => d.radius)
      .attr("fill", d => d.type === 'CORE' ? "#0A0A0A" : "#141414")
      .attr("stroke", d => d.type === 'CORE' ? "#E0FF00" : (d.severity === 'critical' ? "#FF3B30" : "#F97316"))
      .attr("stroke-width", 2);

    // Node Labels
    nodeGroup.append("text")
      .text(d => d.type === 'CORE' ? '5D CORE' : d.id)
      .attr("x", 0)
      .attr("y", d => d.type === 'CORE' ? 45 : d.radius + 15)
      .attr("text-anchor", "middle")
      .attr("fill", d => d.type === 'CORE' ? '#E0FF00' : 'rgba(255,255,255,0.7)')
      .attr("font-size", d => d.type === 'CORE' ? "12px" : "9px")
      .attr("font-family", "monospace")
      .attr("font-weight", "bold");
      
    // Simulation Tick
    simulation.on("tick", () => {
      link
        .attr("x1", d => (d.source as unknown as GraphNode).x!)
        .attr("y1", d => (d.source as unknown as GraphNode).y!)
        .attr("x2", d => (d.target as unknown as GraphNode).x!)
        .attr("y2", d => (d.target as unknown as GraphNode).y!);

      nodeGroup.attr("transform", d => `translate(${d.x},${d.y})`);
    });

    // Defensive Strike Animation Loop
    let animationFrame: number;
    const animateStrikes = () => {
      if (links.length > 0) {
        // Pick a random link for a defensive strike
        const randomLink = links[Math.floor(Math.random() * links.length)];
        const source = randomLink.source as unknown as GraphNode;
        const target = randomLink.target as unknown as GraphNode;
        
        if (source.x && source.y && target.x && target.y) {
          const strike = strikeLayer.append("circle")
            .attr("r", 4)
            .attr("fill", "#E0FF00")
            .attr("cx", target.x)
            .attr("cy", target.y);

          strike.transition()
            .duration(600)
            .ease(d3.easeCubicIn)
            .attr("cx", source.x)
            .attr("cy", source.y)
            .attr("r", 8)
            .style("fill", "#FF3B30")
            .remove();
            
          // Add ripple effect at target
          setTimeout(() => {
            if (!svgRef.current) return;
            strikeLayer.append("circle")
              .attr("cx", source.x!)
              .attr("cy", source.y!)
              .attr("r", source.radius)
              .attr("fill", "none")
              .attr("stroke", "#FF3B30")
              .attr("stroke-width", 2)
              .transition()
              .duration(500)
              .attr("r", source.radius * 2.5)
              .attr("stroke-opacity", 0)
              .remove();
          }, 600);
        }
      }
      
      // Schedule next strike
      setTimeout(() => {
        animationFrame = requestAnimationFrame(animateStrikes);
      }, Math.random() * 800 + 400); // 400ms - 1200ms random interval
    };
    
    animateStrikes();

    return () => {
      simulation.stop();
      cancelAnimationFrame(animationFrame);
    };
  }, [threats]);

  return (
    <div className="w-full bg-[#0C0C0C] border border-white/10 relative overflow-hidden" ref={containerRef}>
      {/* Background Grid */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20" style={{ backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
      <div className="absolute top-4 left-4 z-10 font-mono">
        <h4 className="text-[#E0FF00] font-bold text-xs uppercase tracking-wider flex items-center gap-2">
          <span className="w-2 h-2 bg-[#E0FF00] rounded-full animate-pulse shadow-[0_0_8px_#E0FF00]"></span>
          Active Defense Grid
        </h4>
        <p className="text-white/40 text-[10px] mt-1">Real-time force-directed topology & strike visualization</p>
      </div>
      <svg ref={svgRef} className="w-full relative z-10" style={{ minHeight: '400px' }}></svg>
    </div>
  );
};

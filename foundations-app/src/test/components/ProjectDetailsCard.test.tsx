import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ProjectDetailsCard from "@/components/ProjectDetailsCard";

describe("ProjectDetailsCard Component", () => {
  it("renders structured project details when valid tool result output is provided", () => {
    const mockOutput = {
      found: true,
      project: {
        slug: "video-restoration",
        name: "AI Video Restoration Pipeline",
        summary: "Multi-model sequential video restoration pipeline.",
        problem: "Distortion and face blur in archival historical footage.",
        technologies: ["Python", "PySceneDetect", "InsightFace", "Real-ESRGAN", "FFmpeg"],
        engineeringDecisions: [
          "Sequential stage isolation preventing memory overflow",
          "Automated scene detection boundary calculation",
        ],
        evidence: [
          "Zero frame overlap across 100+ test clips",
          "3.2x processing throughput optimization",
        ],
        repositoryUrl: "https://github.com/vivekcyr25/video-restoration",
        demoUrl: "https://demo.example.com/video-restoration",
      },
    };

    render(<ProjectDetailsCard output={mockOutput} />);

    // 1. Verify Project Header & Name
    expect(screen.getByRole("heading", { level: 3, name: "AI Video Restoration Pipeline" })).toBeInTheDocument();

    // 2. Verify Problem statement is visible
    expect(screen.getByText("Distortion and face blur in archival historical footage.")).toBeInTheDocument();

    // 3. Verify Technologies rendered as badge tags
    expect(screen.getByText("PySceneDetect")).toBeInTheDocument();
    expect(screen.getByText("InsightFace")).toBeInTheDocument();
    expect(screen.getByText("Real-ESRGAN")).toBeInTheDocument();

    // 4. Verify Engineering Decisions list
    expect(screen.getByText("Sequential stage isolation preventing memory overflow")).toBeInTheDocument();

    // 5. Verify Links rendered with accessible names
    const githubLink = screen.getByRole("link", { name: /github/i });
    expect(githubLink).toHaveAttribute("href", "https://github.com/vivekcyr25/video-restoration");

    const demoLink = screen.getByRole("link", { name: /live demo/i });
    expect(demoLink).toHaveAttribute("href", "https://demo.example.com/video-restoration");
  });

  it("renders NoResultCard safely when tool output returns found: false", () => {
    const mockOutput = {
      found: false,
      message: "No project matches query 'unknown-project'",
    };

    render(<ProjectDetailsCard output={mockOutput} />);

    // Verify accessible warning message
    expect(screen.getByText("No matching project found")).toBeInTheDocument();
    expect(
      screen.getByText(/That name did not match a verified portfolio entry/i)
    ).toBeInTheDocument();
  });

  it("handles null, undefined, or malformed tool output safely without crashing", () => {
    const { rerender } = render(<ProjectDetailsCard output={null} />);
    expect(screen.getByText("No matching project found")).toBeInTheDocument();

    rerender(<ProjectDetailsCard output={undefined} />);
    expect(screen.getByText("No matching project found")).toBeInTheDocument();

    rerender(<ProjectDetailsCard output="invalid-string-output" />);
    expect(screen.getByText("No matching project found")).toBeInTheDocument();
  });
});

import { render, screen, fireEvent, within, act, waitFor } from "@testing-library/react";
import ScrollProgress from "./components/common/ScrollProgress";
import App from "./App";

describe("App smoke test", () => {
  test("renders all main sections", () => {
    render(<App />);

    expect(
      screen.getByRole("heading", { level: 1, name: /full-stack developer\. i build anything for the web/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /^work$/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /^skills$/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: /^about$/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: /^experience$/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /send message/i })).toBeInTheDocument();
  });

  test("renders navigation with all section links", () => {
    render(<App />);

    for (const label of [/about/i, /experience/i, /work/i, /skills/i, /contact/i]) {
      expect(screen.getAllByText(label).length).toBeGreaterThan(0);
    }
  });

  test("lists the live client stores in the hero", () => {
    render(<App />);

    for (const store of [/carhartt wip/i, /anita/i, /edwin/i]) {
      expect(screen.getAllByRole("link", { name: store }).length).toBeGreaterThan(0);
    }
  });
});

describe("Hero request console", () => {
  test("sends the request before or after the performance work", () => {
    render(<App />);

    const before = screen.getByRole("button", { name: "Before" });
    const after = screen.getByRole("button", { name: "After" });
    expect(before).toHaveAttribute("aria-pressed", "false");

    fireEvent.click(after);

    expect(after).toHaveAttribute("aria-pressed", "true");
    expect(before).toHaveAttribute("aria-pressed", "false");
    expect(screen.getByText(/elasticsearch, mysql indexes, redis, varnish/i)).toBeInTheDocument();
  });
});

describe("Experience and education", () => {
  test("shows the ENSA diploma with honours and no dates on diplomas", () => {
    render(<App />);

    const diploma = screen.getByText(/university diploma \(d\.u\., bac\+3\)/i).closest("article");
    expect(within(diploma).getByText(/mention très bien/i)).toBeInTheDocument();
    expect(within(diploma).queryByText(/20\d\d/)).not.toBeInTheDocument();
  });

  test("keeps dates on jobs", () => {
    render(<App />);

    expect(screen.getByText(/jan 2024 – jul 2026/i)).toBeInTheDocument();
    expect(screen.getByText(/aug 2026 – present/i)).toBeInTheDocument();
  });
});

describe("Language switcher", () => {
  test("switches the UI to French", () => {
    render(<App />);

    fireEvent.click(screen.getAllByRole("button", { name: "FR" })[0]);

    expect(
      screen.getByRole("heading", { level: 1, name: /développeur full-stack\. sur le web, je construis tout/i })
    ).toBeInTheDocument();
  });
});

describe("SEO", () => {
  test("has a single h1 that carries the name", () => {
    render(<App />);

    const headings = screen.getAllByRole("heading", { level: 1 });
    expect(headings).toHaveLength(1);
    expect(headings[0]).toHaveTextContent(/mehdi aichouch/i);
  });

  test("each language has its own URL and title", () => {
    render(<App />);
    expect(window.location.pathname).toBe("/");
    expect(document.title).toMatch(/^Mehdi Aichouch \| Full-Stack Developer/);

    fireEvent.click(screen.getAllByRole("button", { name: "FR" })[0]);

    expect(window.location.pathname).toBe("/fr");
    expect(document.documentElement.lang).toBe("fr");
    expect(document.title).toMatch(/^Mehdi Aichouch \| Développeur Full-Stack/);
  });

  test("opens in French at /fr", () => {
    window.history.replaceState(null, "", "/fr");
    render(<App />);

    expect(screen.getByRole("heading", { level: 2, name: /^à propos$/i })).toBeInTheDocument();
  });

  test("describes every image", () => {
    render(<App />);

    expect(screen.getByAltText("Portrait of Mehdi Aichouch")).toBeInTheDocument();
    expect(screen.getByAltText("Screenshot of the B2B Carhartt WIP website")).toBeInTheDocument();
    for (const img of document.querySelectorAll("img")) expect(img).toHaveAttribute("alt", expect.stringMatching(/\S/));
  });
});

describe("Projects", () => {
  test("shows all other projects on demand", () => {
    render(<App />);

    const showAll = screen.getByRole("button", { name: /show all \d+ projects/i });
    fireEvent.click(showAll);

    expect(screen.getByRole("button", { name: /show fewer/i })).toBeInTheDocument();
    expect(screen.getByText("Portfolio")).toBeInTheDocument();
  });
});

describe("Project case study", () => {
  test("opens a dialog with the project details and closes on Escape", async () => {
    render(<App />);

    fireEvent.click(screen.getByRole("button", { name: /case study.*anita/i }));

    const dialog = screen.getByRole("dialog", { name: /anita/i });
    expect(within(dialog).getByRole("link", { name: /visit the store/i })).toHaveAttribute("href", "https://www.anita.com");

    fireEvent.keyDown(window, { key: "Escape" });
    await waitFor(() => expect(screen.queryByRole("dialog", { name: /anita/i })).not.toBeInTheDocument());
  });
});

describe("Resume modal", () => {
  test("opens with a download button per language", () => {
    render(<App />);

    fireEvent.click(screen.getByRole("button", { name: /download resume/i }));

    const dialog = screen.getByRole("dialog", { name: /download my resume/i });
    expect(within(dialog).getByRole("button", { name: /english \(pdf\)/i })).toBeInTheDocument();
    expect(within(dialog).getByRole("button", { name: /french \(pdf\)/i })).toBeInTheDocument();
  });
});

describe("Contact form validation", () => {
  test("shows an inline error for every empty field on submit", async () => {
    render(<App />);

    fireEvent.click(screen.getByRole("button", { name: /send message/i }));

    expect(await screen.findByText(/enter your name/i)).toBeInTheDocument();
    expect(screen.getByText(/enter a valid email address/i)).toBeInTheDocument();
    expect(screen.getByText(/enter a message/i)).toBeInTheDocument();
  });

  test("shows an inline error for an invalid email", async () => {
    render(<App />);

    fireEvent.change(screen.getByLabelText(/^email$/i), {
      target: { value: "not-an-email" },
    });

    expect(await screen.findByText(/enter a valid email address/i)).toBeInTheDocument();
  });

  test("clears the field error once the user types", async () => {
    render(<App />);

    fireEvent.click(screen.getByRole("button", { name: /send message/i }));
    expect(await screen.findByText(/enter your name/i)).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText(/^name$/i), {
      target: { value: "Jane" },
    });

    expect(screen.queryByText(/enter your name/i)).not.toBeInTheDocument();
  });
});

describe("Scroll progress line", () => {
  test("grows when scrolling down and shrinks when scrolling back up", async () => {
    Object.defineProperty(document.documentElement, "scrollHeight", { configurable: true, value: 3000 });
    Object.defineProperty(window, "innerHeight", { configurable: true, value: 1000 });
    const { container } = render(<ScrollProgress />);
    const bar = container.querySelector("[aria-hidden] > div");
    const scrollTo = async (y) => {
      window.scrollY = y;
      await act(async () => {
        window.dispatchEvent(new Event("scroll"));
        await new Promise((r) => requestAnimationFrame(r));
      });
    };

    await scrollTo(1000);
    expect(bar.style.transform).toBe("scaleX(0.5)");
    await scrollTo(2000);
    expect(bar.style.transform).toBe("scaleX(1)");
    await scrollTo(500);
    expect(bar.style.transform).toBe("scaleX(0.25)");
  });
});

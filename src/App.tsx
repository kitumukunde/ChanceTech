import { useState, type FormEvent } from 'react';

import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Code2,
  Database,
  Github,
  Linkedin,
  Mail,
  Menu,
  Monitor,
  Server,
  Sparkles,
  Wrench,
  X,
} from 'lucide-react';


const skills = [
  {
    title: 'Frontend Development',
    detail: 'React, TypeScript, JavaScript, HTML, CSS and Tailwind CSS for responsive user interfaces.',
    icon: Code2,
  },
  {
    title: 'Backend Development',
    detail: 'PHP, Laravel and REST API development for application logic and server-side functionality.',
    icon: Server,
  },
  {
    title: 'Database Management',
    detail: 'MySQL, relational database design, data organization and database integration.',
    icon: Database,
  },
  {
    title: 'IT Support & Troubleshooting',
    detail: 'Windows and Ubuntu support, hardware and software troubleshooting, printer maintenance and basic networking.',
    icon: Wrench,
  },
  {
    title: 'Systems & Development Tools',
    detail: 'Linux, Windows, Git, GitHub, VS Code, development environments and technical support tools.',
    icon: Monitor,
  },
  {
    title: 'AI Development',
    detail: 'Exploring OpenAI API integration, large language models (LLMs), AI-powered applications and workflow automation.',
    icon: Sparkles,
  },
];



const services = [
  {
    number: '01',
    title: 'Web Development',
    detail:
      'I design and develop responsive websites, business platforms and custom web applications using React, TypeScript, PHP and modern web technologies.',
  },
  {
    number: '02',
    title: 'IT Support & Maintenance',
    detail:
      'I help individuals and businesses troubleshoot computer problems, install software, maintain hardware, configure systems and resolve basic networking issues.',
  },
  {
    number: '03',
    title: 'Backend & Database Development',
    detail:
      'I build backend functionality, REST APIs and structured MySQL databases using PHP and Laravel to support reliable web applications.',
  },
  {
    number: '04',
    title: 'AI Integration',
    detail:
      'I explore practical AI solutions by integrating OpenAI APIs and language models into applications to improve automation and user experiences.',
  },
];


const projects = [

{
  name: 'Smart Healthcare AI',
  type: 'AI-Powered Healthcare Web Application',
  description:
    'A PHP and MySQL healthcare application featuring patient and doctor workflows, appointment management, rule-based diabetes and hypertension decision-support tools, and an OpenAI-powered chatbot for health-related questions.',
  number: '01',
  github: 'https://github.com/kitumukunde/healthcareAi',
  technologies: [
    'PHP',
    'MySQL',
    'JavaScript',
    'OpenAI API',
    'Guzzle',
    'Composer',
    'PHPMailer',
    'PHP dotenv',
  ],
},

 {
  name: 'Global Gateways Tours & Travels',
  type: 'Travel & Tourism Web Application',
  description:
    'A travel and tourism website featuring flight booking inquiries, travel services, customer contact forms, and email handling with PHP and MySQL.',
  number: '02',
  github: 'https://github.com/kitumukunde/Global',
  technologies: [
    'PHP',
    'MySQL',
    'JavaScript',
    'HTML',
    'CSS',
    'Bootstrap',
    'PHPMailer',
  ],
},
 {
  name: 'ChanceTech Portfolio',
  type: 'Personal Portfolio & Developer Website',
  description:
    'A responsive developer portfolio showcasing software projects, full-stack development skills, IT expertise, and AI development interests. Built with React, TypeScript, and Tailwind CSS.',
  number: '03',
    github: 'https://github.com/kitumukunde/ChanceTech',
  technologies: [
    'React',
    'TypeScript',
    'Tailwind CSS',
    'JavaScript',
    'Lucide React',
    'Vite',
  ],
},
];

const navigation = [
  ['About', '#about'],
  ['Skills', '#skills'],
  ['Services', '#services'],
  ['Projects', '#projects'],
  ['Contact', '#contact'],
];

 type ContactFormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
  website: string;
};
function App() {
  const [menuOpen, setMenuOpen] = useState(false);
const [contactForm, setContactForm] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
    website: '',
  });
const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);
 const handleContactSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setIsSubmitting(true);
    setSubmissionStatus(null);

    try {
      const response = await fetch('/api/contact.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactForm),
      });

      const result: {
        success?: boolean;
        message?: string;
      } = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || 'Unable to send your message.'
        );
      }

      setSubmissionStatus({
        type: 'success',
        message: result.message || 'Your message was sent successfully.',
      });

      setContactForm({
        name: '',
        email: '',
        subject: '',
        message: '',
        website: '',
      });
    } catch (error) {
      setSubmissionStatus({
        type: 'error',
        message:
          error instanceof Error
            ? error.message
            : 'Something went wrong. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <div className="min-h-screen overflow-hidden bg-[#090909] text-white selection:bg-red-500 selection:text-white">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#090909]/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          <a
            href="#home"
            className="text-xl font-black tracking-tight"
            aria-label="ChanceTech home"
          >
            Chance<span className="text-red-500">Tech.</span>
          </a>
          <nav
            className="hidden items-center gap-8 md:flex"
            aria-label="Main navigation"
          >
            {navigation.map(([label, href]) => (
              <a
                key={label}
                href={href}
                className="text-sm text-zinc-400 transition hover:text-white"
              >
                {label}
              </a>
            ))}
          </nav>
          <a
            href="#contact"
            className="hidden rounded-full bg-red-600 px-5 py-2.5 text-sm font-semibold transition hover:bg-red-500 md:inline-flex"
          >
            Let&apos;s talk <ArrowUpRight size={16} className="ml-2" />
          </a>
          <button
            className="rounded-lg border border-white/15 p-2 md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
        {menuOpen && (
          <nav
            className="border-t border-white/10 bg-[#101010] px-5 py-4 md:hidden"
            aria-label="Mobile navigation"
          >
            {navigation.map(([label, href]) => (
              <a
                key={label}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="block py-3 text-sm text-zinc-300"
              >
                {label}
              </a>
            ))}
          </nav>
        )}
      </header>

      <main>
        <section
          id="home"
          className="relative flex min-h-screen items-center px-5 pb-20 pt-32 sm:px-8"
        >
          <div className="absolute right-[-12rem] top-28 h-[34rem] w-[34rem] rounded-full bg-red-600/10 blur-[130px]" />
          <div className="relative mx-auto grid w-full max-w-7xl items-center gap-16 lg:grid-cols-[1.2fr_.8fr]">
            <div>
              <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-4 py-2 text-xs font-medium uppercase tracking-[.18em] text-red-300">
                <span className="h-2 w-2 rounded-full bg-red-500" /> Available
                for opportunities
              </div>
              <p className="mb-5 text-sm font-semibold uppercase tracking-[.28em] text-zinc-500">
                Hello, I&apos;m Uzamukunda Chance
              </p>
              <h1 className="max-w-4xl text-5xl font-black leading-[1.05] tracking-[-.055em] sm:text-7xl xl:text-8xl">
                Building digital
                <span className="block text-red-500">solutions</span>
                that matter.
              </h1>

            <p className="mt-7 max-w-2xl text-lg font-medium leading-8 text-zinc-300 sm:text-xl">
                 Full-Stack Developer <span className="text-red-500">·</span> IT Specialist
                    <span className="text-red-500"> · </span> AI-focused Developer
               </p>

              <p className="mt-5 max-w-xl text-base leading-8 text-zinc-400 sm:text-lg">
                  I build responsive web applications, develop reliable backend systems,
                     solve technical challenges, and integrate practical AI solutions
                          that improve how people work and interact with technology.
                            </p>

              <div className="mt-10 flex flex-wrap items-center gap-4">
                <a
                  href="#projects"
                  className="inline-flex items-center rounded-full bg-red-600 px-6 py-3.5 text-sm font-semibold transition hover:bg-red-500"
                >
                  Explore my work <ArrowUpRight size={17} className="ml-2" />
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center rounded-full border border-white/15 px-6 py-3.5 text-sm font-semibold text-zinc-200 transition hover:border-white/40"
                >
                  Contact me <ArrowRight size={17} className="ml-2" />
                </a>
              </div>
              <div className="mt-16 flex items-center gap-5 text-zinc-500">
                <a
                  href="https://github.com/kitumukunde"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                  className="transition hover:text-white"
                >
                  <Github size={20} />
                </a>
                <a
                  href="https://www.linkedin.com/in/chance-uzamukunda-187b94330/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="transition hover:text-white"
                >
                  <Linkedin size={20} />
                </a>
                <span className="h-px w-14 bg-white/15" />
                <span className="text-xs uppercase tracking-[.2em]">
                  Based in Rwanda
                </span>
              </div>
            </div>
            <div className="relative mx-auto w-full max-w-md">
              <div className="absolute -inset-5 rounded-[2rem] border border-red-500/20 rotate-3" />
              <div className="relative rounded-[1.7rem] border border-white/10 bg-gradient-to-br from-[#202020] to-[#101010] p-7 shadow-2xl shadow-red-950/30 sm:p-10">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-[.22em] text-zinc-500">
                    Developer profile
                  </span>
                  <span className="text-sm font-bold text-red-500">
                    CT / 01
                  </span>
                </div>

<div className="relative my-12 flex min-h-56 items-center justify-center overflow-hidden rounded-2xl border border-red-500/20 bg-[#0b0b0b] p-6">
  <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-red-600/10 blur-3xl" />
  <div className="absolute -bottom-16 -left-12 h-40 w-40 rounded-full bg-red-600/10 blur-3xl" />

  <div className="relative text-center">

<div className="mx-auto h-32 w-32 overflow-hidden rounded-full border-2 border-red-500/50 shadow-lg shadow-red-950/40">
  <img
    src="/images/2.png"
    alt="Uzamukunda Chance"
    className="h-full w-full object-cover"
  />
</div>


    <p className="mt-5 text-base font-bold tracking-[.15em] text-white">
      UZAMUKUNDA CHANCE
    </p>

    <p className="mt-2 text-xs uppercase tracking-[.2em] text-zinc-500">
      Full-Stack Developer & IT Specialist
    </p>

    <div className="mt-5 flex items-center justify-center gap-2">
      <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
      <span className="text-xs text-zinc-400">
        Building with technology
      </span>
    </div>
  </div>
</div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-white/[.04] p-4">
                    <p className="text-2xl font-bold">01</p>
                    <p className="mt-1 text-xs text-zinc-500">
                      Build with purpose
                    </p>
                  </div>
                  <div className="rounded-xl bg-white/[.04] p-4">
                    <p className="text-2xl font-bold">AI</p>
                    <p className="mt-1 text-xs text-zinc-500">
                      Always learning
                    </p>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-7 -left-7 hidden rounded-2xl border border-white/10 bg-[#171717] p-4 shadow-xl sm:block">
                <p className="text-xs text-zinc-500">Core focus</p>
                <p className="mt-1 text-sm font-semibold">
                  Turning ideas into software.
                </p>
              </div>
            </div>
          </div>
          <a
            href="#about"
            className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-xs uppercase tracking-[.2em] text-zinc-600 transition hover:text-white md:flex"
          >
            Scroll to explore <ArrowDown size={14} />
          </a>
        </section>

        <section
          id="about"
          className="border-y border-white/10 bg-[#101010] px-5 py-24 sm:px-8"
        >
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.7fr_1.3fr]">
            <div>
              <p className="section-kicker">01 / About</p>
              <h2 className="section-title">
                Technology with a <span className="text-red-500">purpose.</span>
              </h2>
            </div>
            <div>


<p className="text-xl leading-9 text-zinc-300">
  I&apos;m Uzamukunda Chance, an IT professional and full-stack
  developer based in Rwanda. My background combines information
  technology, computer support, and web development. I enjoy
  building practical solutions that help businesses and people
  work more efficiently.
</p>

     <p className="mt-6 leading-8 text-zinc-500">
     I work with React, TypeScript, PHP, Laravel, and MySQL to
        develop modern web applications and backend systems. My
        experience also includes computer troubleshooting, hardware
         and software maintenance, and basic networking. I&apos;m
         currently expanding my skills in artificial intelligence
           and AI-powered application development.
</p>

<div className="mt-9 flex flex-wrap gap-3">
  {[
    'Full-Stack Development',
    'IT Support & Troubleshooting',
    'AI-Powered Applications',
  ].map(item => (
    <span
      key={item}
      className="rounded-full border border-white/10 px-4 py-2 text-xs text-zinc-400"
    >
      {item}
    </span>
  ))}
</div>

            </div>
          </div>
        </section>

        <section id="skills" className="px-5 py-24 sm:px-8">
          <div className="mx-auto max-w-7xl">
            <p className="section-kicker">02 / Expertise</p>
            <div className="mb-12 flex flex-wrap items-end justify-between gap-5">
              <h2 className="section-title">
                Skills & <span className="text-red-500">technology.</span>
              </h2>
              <p className="max-w-sm text-sm leading-6 text-zinc-500">
                A growing toolkit for designing, building and supporting digital
                solutions.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {skills.map(({ title, detail, icon: Icon }) => (
                <article
                  key={title}
                  className="group rounded-2xl border border-white/10 bg-white/[.025] p-7 transition hover:-translate-y-1 hover:border-red-500/40 hover:bg-white/[.045]"
                >
                  <div className="mb-7 flex h-11 w-11 items-center justify-center rounded-xl bg-red-500/10 text-red-400">
                    <Icon size={21} />
                  </div>
                  <h3 className="text-lg font-bold">{title}</h3>
                  <p className="mt-3 text-sm leading-7 text-zinc-500">
                    {detail}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="services"
          className="border-y border-white/10 bg-[#101010] px-5 py-24 sm:px-8"
        >
          <div className="mx-auto max-w-7xl">
            <p className="section-kicker">03 / What I do</p>
            <h2 className="section-title mb-12">
              Services built around{' '}
              <span className="text-red-500">your needs.</span>
            </h2>
            <div className="divide-y divide-white/10 border-y border-white/10">
              {services.map(service => (
                <article
                  key={service.number}
                  className="grid gap-4 py-7 sm:grid-cols-[5rem_1fr_1.2fr] sm:items-center"
                >
                  <span className="text-sm text-red-500">{service.number}</span>
                  <h3 className="text-xl font-bold">{service.title}</h3>
                  <p className="max-w-xl text-sm leading-7 text-zinc-500">
                    {service.detail}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="projects" className="px-5 py-24 sm:px-8">
          <div className="mx-auto max-w-7xl">
            <p className="section-kicker">04 / Selected work</p>
            <div className="mb-12 flex flex-wrap items-end justify-between gap-5">
              <h2 className="section-title">
                Projects & <span className="text-red-500">experiments.</span>
              </h2>
              <a
                href="https://github.com/kitumukunde"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-sm text-zinc-400 transition hover:text-white"
              >
                More on GitHub <ArrowUpRight size={16} />
              </a>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              {projects.map(project => (
  <article
    key={project.number}
    className={`group relative flex min-h-72 flex-col rounded-2xl border border-white/10 bg-gradient-to-br from-[#191919] to-[#0d0d0d] p-7 transition ${
      project.github
        ? 'cursor-pointer hover:border-red-500/40'
        : 'cursor-default'
    }`}
  >
    <div className="flex items-center justify-between">
      <span className="text-xs tracking-[.2em] text-red-500">
        {project.number}
      </span>

      <ArrowUpRight
        size={18}
        className="text-zinc-600 transition group-hover:text-red-400"
      />
    </div>

    <div className="mt-12">
      <p className="text-xs uppercase tracking-[.15em] text-zinc-600">
        {project.type}
      </p>

      <h3 className="mt-3 text-2xl font-bold">{project.name}</h3>

      <p className="mt-4 text-sm leading-7 text-zinc-500">
        {project.description}
      </p>
    </div>

    {project.technologies && (
      <div className="mt-6 flex flex-wrap gap-2">
        {project.technologies.map(technology => (
          <span
            key={technology}
            className="rounded-full border border-white/10 px-3 py-1 text-xs text-zinc-400"
          >
            {technology}
          </span>
        ))}
      </div>
    )}

    {project.github && (
      <a
        href={project.github}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`View ${project.name} on GitHub`}
        className="absolute inset-0 z-10 rounded-2xl"
      />
    )}

    {!project.github && (
      <span className="mt-6 text-xs font-semibold uppercase tracking-wider text-red-400">
        In development · Coming soon
      </span>
    )}
  </article>
))}
            </div>

          </div>
        </section>


<section id="contact" className="px-5 pb-24 pt-12 sm:px-8">
  <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-red-500/20 bg-gradient-to-br from-[#241010] via-[#171010] to-[#101010] p-8 sm:p-14">

    <p className="section-kicker">05 / Get in touch</p>

    <div className="mt-8 grid gap-14 lg:grid-cols-[1.4fr_0.8fr]">

      {/* Left: Contact introduction */}
      <div>
        <h2 className="max-w-3xl text-4xl font-black leading-tight tracking-tight sm:text-6xl">
          Have an idea? Let's build something{' '}
          <span className="text-red-500">meaningful.</span>
        </h2>

        <p className="mt-6 max-w-xl leading-8 text-zinc-400">
          I'm open to freelance projects, software development,
          IT support opportunities and professional collaborations.
          Let's discuss how we can turn your ideas into practical
          digital solutions.
        </p>


<form onSubmit={handleContactSubmit} className="mt-9 space-y-5">
    {/* Honeypot field: hidden from normal visitors */}
  <div
    aria-hidden="true"
    className="absolute -left-[9999px] h-px w-px overflow-hidden"
  >
    <label htmlFor="contact-website">
      Leave this field empty
    </label>

    <input
      id="contact-website"
      type="text"
      name="website"
      tabIndex={-1}
      autoComplete="off"
      value={contactForm.website}
      onChange={event =>
        setContactForm({ ...contactForm, website: event.target.value })
      }
    />
  </div>
  <div className="grid gap-5 sm:grid-cols-2">
    <div>
      <label htmlFor="contact-name" className="mb-2 block text-sm text-zinc-300">
        Your name
      </label>
      <input
        id="contact-name"
        type="text"
        required
        maxLength={100}
        value={contactForm.name}
        onChange={event =>
          setContactForm({ ...contactForm, name: event.target.value })
        }
        placeholder="Enter your name"
        className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-red-500"
      />
    </div>

    <div>
      <label htmlFor="contact-email" className="mb-2 block text-sm text-zinc-300">
        Email address
      </label>
      <input
        id="contact-email"
        type="email"
        required
        maxLength={254}
        value={contactForm.email}
        onChange={event =>
          setContactForm({ ...contactForm, email: event.target.value })
        }
        placeholder="you@example.com"
        className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-red-500"
      />
    </div>
  </div>

  <div>
    <label htmlFor="contact-subject" className="mb-2 block text-sm text-zinc-300">
      Subject
    </label>
    <input
      id="contact-subject"
      type="text"
      required
      maxLength={150}
      value={contactForm.subject}
      onChange={event =>
        setContactForm({ ...contactForm, subject: event.target.value })
      }
      placeholder="What would you like to discuss?"
      className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-red-500"
    />
  </div>

  <div>
    <label htmlFor="contact-message" className="mb-2 block text-sm text-zinc-300">
      Message
    </label>
    <textarea
      id="contact-message"
      required
      maxLength={5000}
      rows={5}
      value={contactForm.message}
      onChange={event =>
        setContactForm({ ...contactForm, message: event.target.value })
      }
      placeholder="Tell me about your project or inquiry..."
      className="w-full resize-y rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-red-500"
    />
  </div>

  {submissionStatus && (
    <p
      role="status"
      aria-live="polite"
      className={
        submissionStatus.type === 'success'
          ? 'text-sm text-green-400'
          : 'text-sm text-red-400'
      }
    >
      {submissionStatus.message}
    </p>
  )}

  <button
    type="submit"
    disabled={isSubmitting}
    className="inline-flex items-center rounded-full bg-red-600 px-7 py-4 text-sm font-semibold transition hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-60"
  >
    {isSubmitting ? 'Sending...' : 'Send message'}
    <Mail size={17} className="ml-3" />
  </button>
</form>

      </div>

      {/* Right: Contact information */}
      <div className="flex flex-col justify-center gap-8 border-t border-white/10 pt-8 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">

        <div>
          <p className="text-xs uppercase tracking-[.2em] text-zinc-500">
            Email
          </p>
          <a href="https://mail.google.com/mail/?view=cm&fs=1&to=chanceuzamukundaog1%40gmail.com"
  target="_blank"
  rel="noopener noreferrer"
  className="mt-3 block break-all text-base font-medium text-white transition hover:text-red-400"
>
   chanceuzamukundaog1@gmail.com
</a>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[.2em] text-zinc-500">
            Location
          </p>
          <p className="mt-3 text-base font-medium text-white">
            Rwanda
          </p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[.2em] text-zinc-500">
            Connect with me
          </p>

          <div className="mt-4 flex flex-wrap gap-5 text-sm font-medium text-zinc-400">
            <a
              href="https://github.com/kitumukunde"
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:text-red-400"
            >
              GitHub ↗
            </a>

            <a
              href="https://www.linkedin.com/in/chanceuzamukunda-187b94330/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:text-red-400"
            >
              LinkedIn ↗
            </a>
          </div>
        </div>

      </div>
    </div>

  </div>
</section>

      </main>

      <footer className="border-t border-white/10 px-5 py-7 sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 text-xs text-zinc-600">
          <a href="#home" className="font-bold tracking-tight text-zinc-300">
            Chance<span className="text-red-500">Tech.</span>
          </a>
          <p>
            © {new Date().getFullYear()} Uzamukunda Chance. Built with purpose.
          </p>
          <a href="#home" className="hover:text-white">
            Back to top ↑
          </a>
        </div>
      </footer>
    </div>
  );
}

export default App;

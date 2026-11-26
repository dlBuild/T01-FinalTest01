
import { Link } from 'react-router-dom';

export default function About() {
  const solutions = [
    {
      number: '01',
      title: 'Career Guidance & Career Clarity',
      description:
        'Understand your interests, explore career opportunities, identify your strengths and make better-informed decisions about your professional future.',
    },
    {
      number: '02',
      title: 'Skills & Career Development',
      description:
        "Discover the skills required in today's evolving job market, understand career roadmaps and learn how to prepare yourself for real-world opportunities.",
    },
    {
      number: '03',
      title: 'Goal Setting & Personal Growth',
      description:
        'Turn your ambitions into realistic goals. Learn how to build better habits, manage your time, create practical schedules and stay consistent with your plans.',
    },
    {
      number: '04',
      title: 'Study & Examination Guidance',
      description:
        'Explore effective study techniques, examination preparation strategies, revision methods, productivity tips and practical academic resources.',
    },
    {
      number: '05',
      title: 'Digital Guides & Learning Resources',
      description:
        'Access carefully structured documents, practical guides, worksheets and learning materials designed to help you understand problems and take meaningful action.',
    },
    {
      number: '06',
      title: 'Interactive Learning & Community',
      description:
        'We aim to introduce more interactive learning experiences, sessions and opportunities to connect with people who share similar goals as the platform grows.',
    },
  ];

  const principles = [
    {
      title: 'Quality',
      description:
        'We aim to develop well-researched, thoughtfully structured and practical resources rather than publish content just for the sake of it.',
    },
    {
      title: 'Affordability',
      description:
        'Access to useful guidance should not be limited to people who can afford expensive courses or personal mentorship. We are committed to keeping our digital solutions accessible and reasonably priced.',
    },
    {
      title: 'Practicality',
      description:
        'Knowledge becomes valuable when people can apply it. Our resources are designed with real challenges, clear explanations and actionable steps in mind.',
    },
  ];

  const futurePlans = [
    'More personalised learning and career guidance.',
    'Interactive workshops and expert-led sessions.',
    'Structured learning programmes and career roadmaps.',
    'Better tools for goal setting, planning and productivity.',
    'A community where young people can learn and grow together.',
    'More opportunities to access practical knowledge and resources.',
  ];

  const socials = [
    {
      name: 'YouTube',
      description: 'Educational videos, practical guidance and exclusive content.',
      url: 'https://www.youtube.com/',
    },
    {
      name: 'Instagram',
      description: 'Updates, insights and useful content for everyday growth.',
      url: 'https://www.instagram.com/',
    },
    {
      name: 'Facebook',
      description: 'Stay connected with our latest resources and announcements.',
      url: 'https://www.facebook.com/',
    },
    {
      name: 'LinkedIn',
      description: 'Follow our professional journey and career-related updates.',
      url: 'https://www.linkedin.com/',
    },
    {
      name: 'WhatsApp',
      description: 'Stay informed about important updates and new releases.',
      url: 'https://www.whatsapp.com/',
    },
  ];

  return (
    <main className="overflow-hidden">

      {/* HERO SECTION */}
      <section className="bg-navy-900 text-cream-soft py-20 md:py-28">
        <div className="container-t01 max-w-4xl text-center">
          <span className="section-tag">ABOUT T01</span>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mt-5 mb-8">
            Your Future Deserves More Than Guesswork.
          </h1>

          <div className="space-y-5 text-base md:text-lg text-cream-soft/75 leading-relaxed max-w-3xl mx-auto">
            <p>
              Every young person has dreams. Some want to build successful
              careers, some want to become financially independent, and
              others are still trying to figure out what they truly want
              from life.
            </p>

            <p>
              But somewhere between choosing a career, completing an
              education, learning new skills, preparing for examinations
              and dealing with the pressure of expectations, many young
              people lose direction.
            </p>

            <p>
              They have questions, but often don't know where to find
              the right answers.
            </p>

            <p className="text-xl font-bold text-cream-soft">
              T01 was created to help change that.
            </p>

            <p>
              We believe that young people don't lack dreams or ambition.
              What they often lack is the right guidance, practical
              resources, clarity and a structured approach to turning
              those dreams into reality.
            </p>

            <p>
              T01 is our initiative to make reliable, practical and
              affordable guidance accessible to students, graduates and
              young people who want to build a better future.
            </p>
          </div>
        </div>
      </section>

      {/* OUR STORY */}
      <section className="container-t01 py-20 md:py-24 max-w-4xl">
        <div className="text-center mb-12">
          <span className="section-tag">OUR STORY</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-navy-900 mt-4">
            A Small Beginning. A Bigger Purpose.
          </h2>
          <p className="text-navy-800/60 mt-3 font-medium">
            From a simple idea in 2022 to a growing platform.
          </p>
        </div>

        <div className="space-y-6 text-navy-800/75 leading-relaxed text-base md:text-lg">
          <p>
            The journey of T01 began around 2022 with a simple idea:
            to help students overcome their learning difficulties and
            make their educational journey easier.
          </p>

          <p>
            We started with a YouTube channel, sharing educational
            guidance, study-related content and solutions for students
            who wanted to learn better but struggled to find the right
            approach.
          </p>

          <p>
            We started small, with limited resources, but with a clear
            intention to create something meaningful.
          </p>

          <p>
            As we continued learning and understanding the challenges
            young people face, we realised that the problems go far
            beyond examinations and academic performance.
          </p>

          <p>
            Students struggle to choose the right career. Graduates
            struggle to become job-ready. Young people spend years
            studying but remain confused about practical skills,
            employment opportunities and their next steps.
          </p>

          <p>
            At the same time, technology is changing rapidly.
            Artificial Intelligence is transforming industries,
            creating new opportunities while making many young people
            uncertain about their future.
          </p>

          <p>
            The question is no longer just about getting a degree.
            It is about developing relevant skills, making informed
            decisions, adapting to change and preparing for the
            opportunities ahead.
          </p>

          <p>
            We realised that young people need more than occasional
            advice. They need a place where they can access practical
            guidance, structured resources and solutions for different
            stages of their journey.
          </p>

          <p>
            That realisation became the foundation of the T01 platform.
          </p>

          <p>
            Today, with a dedicated team and a bigger vision, we are
            taking the next step: building T01 into a platform that
            brings learning resources, career guidance, personal
            development and practical solutions together in one place.
          </p>

          <p>
            What started as a small initiative is growing into
            something we hope will make a lasting difference.
          </p>

          <p className="text-xl font-extrabold text-navy-900">
            And this is only the beginning.
          </p>
        </div>
      </section>

      {/* WHY WE EXIST */}
      <section className="bg-cream-soft py-20 md:py-24">
        <div className="container-t01 max-w-4xl">
          <div className="text-center mb-10">
            <span className="section-tag">OUR PURPOSE</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-navy-900 mt-4">
              Why We Exist
            </h2>
            <p className="text-lg text-navy-800/60 mt-3 font-semibold">
              Because Finding the Right Direction Shouldn't Be So Difficult.
            </p>
          </div>

          <div className="space-y-5 text-navy-800/75 text-base md:text-lg leading-relaxed">
            <p>
              We understand that not everyone has access to experienced
              mentors, professional guidance or expensive learning resources.
            </p>

            <p>
              Many students and graduates are trying to figure everything
              out on their own.
            </p>

            <p>
              Some don't know which skills to learn. Some struggle with
              time management. Some prepare for examinations without
              knowing effective study techniques. Others have ambitious
              career goals but no clear plan to achieve them.
            </p>

            <p>
              We want to make that journey easier.
            </p>

            <p>
              Our purpose is to help young people move from confusion to
              clarity, from planning to action, and from learning to
              meaningful progress.
            </p>

            <p>
              We don't believe in selling unrealistic dreams or promising
              overnight success.
            </p>

            <p className="font-bold text-navy-900">
              We believe in providing useful knowledge, practical tools
              and structured guidance that people can actually apply
              in their lives.
            </p>
          </div>
        </div>
      </section>

      {/* WHAT WE ARE BUILDING */}
      <section className="container-t01 py-20 md:py-24">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="section-tag">WHAT WE DO</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-navy-900 mt-4">
            What We Are Building
          </h2>
          <p className="text-lg text-navy-800/60 mt-3 font-semibold">
            Practical Solutions for Every Stage of Your Growth.
          </p>
          <p className="text-navy-800/70 leading-relaxed mt-5">
            T01 is being developed as a growing digital platform that
            supports young people across different areas of education,
            career development and personal growth.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {solutions.map((item) => (
            <div
              key={item.number}
              className="card p-7 hover:-translate-y-1 transition-transform duration-300"
            >
              <span className="text-sm font-extrabold text-navy-800/35">
                {item.number}
              </span>

              <h3 className="text-xl font-extrabold text-navy-900 mt-4 mb-3">
                {item.title}
              </h3>

              <p className="text-navy-800/70 leading-relaxed text-sm md:text-base">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        <p className="text-center text-navy-800/70 text-base md:text-lg leading-relaxed max-w-3xl mx-auto mt-12">
          Our focus is not simply to provide information. It is to help
          people understand what to do next and how to take their next step.
        </p>
      </section>

      {/* OUR APPROACH */}
      <section className="bg-navy-900 text-cream-soft py-20 md:py-24">
        <div className="container-t01">
          <div className="text-center mb-14">
            <span className="section-tag">OUR APPROACH</span>
            <h2 className="text-3xl md:text-4xl font-extrabold mt-4">
              Useful Knowledge. Practical Guidance. Affordable Access.
            </h2>
            <p className="text-cream-soft/65 mt-4 text-lg">
              Three principles that guide everything we aim to build.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-7">
            {principles.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-cream-soft/15 p-7 md:p-8"
              >
                <h3 className="text-2xl font-extrabold mb-4">
                  {item.title}
                </h3>

                <p className="text-cream-soft/70 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          <p className="text-center text-cream-soft/70 leading-relaxed max-w-3xl mx-auto mt-12">
            We are continuously learning, researching and improving
            our resources to make them more useful for the people we serve.
          </p>
        </div>
      </section>

      {/* LONG-TERM VISION */}
      <section className="container-t01 py-20 md:py-24 max-w-4xl">
        <div className="text-center mb-10">
          <span className="section-tag">OUR VISION</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-navy-900 mt-4">
            More Than a Platform. A Long-Term Vision.
          </h2>
        </div>

        <div className="space-y-5 text-navy-800/75 text-base md:text-lg leading-relaxed">
          <p>
            We don't see T01 as just a collection of digital documents,
            courses or educational content.
          </p>

          <p>
            We envision a platform where a student can find guidance
            while choosing a career, a graduate can prepare for
            employment, and a young professional can continue
            developing skills and working towards bigger goals.
          </p>

          <p className="font-bold text-navy-900">
            As T01 grows, we aim to introduce:
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 mt-8">
          {futurePlans.map((plan, index) => (
            <div
              key={index}
              className="card p-5 flex items-start gap-3"
            >
              <span className="text-navy-900 font-extrabold">
                0{index + 1}
              </span>
              <p className="text-navy-800/75 leading-relaxed">
                {plan}
              </p>
            </div>
          ))}
        </div>

        <div className="space-y-5 text-navy-800/75 text-base md:text-lg leading-relaxed mt-10">
          <p>
            These are part of our long-term vision. We know that
            building something meaningful takes time, consistency
            and continuous improvement.
          </p>

          <p className="font-bold text-navy-900">
            We are starting with what we can offer today and working
            towards what we want T01 to become tomorrow.
          </p>
        </div>
      </section>

      {/* JOIN OUR JOURNEY */}
      <section className="bg-cream-soft py-20 md:py-24">
        <div className="container-t01 max-w-3xl text-center">
          <span className="section-tag">BE PART OF OUR JOURNEY</span>

          <h2 className="text-3xl md:text-5xl font-extrabold text-navy-900 mt-5 mb-6">
            Your Growth Matters. And We'd Love to Be Part of It.
          </h2>

          <div className="space-y-5 text-navy-800/70 text-base md:text-lg leading-relaxed">
            <p>
              T01 is still growing, and we know there is a lot more to build.
            </p>

            <p>
              You can be part of this journey from the beginning.
            </p>

            <p>
              Create your free T01 account to explore available free
              guides, documents and learning resources. Stay connected
              to discover new releases, updates and opportunities as
              we expand the platform.
            </p>

            <p>
              You can also follow our journey through our social media
              channels, where we share useful content, updates and
              educational resources.
            </p>
          </div>

          <p className="text-xl font-extrabold text-navy-900 mt-8 mb-7">
            Start with a free account. Explore what helps you. Keep growing with us.
          </p>

          <Link
            to="/register"
            className="inline-flex items-center justify-center bg-navy-900 text-cream-soft px-8 py-4 rounded-xl font-bold hover:opacity-90 transition-opacity"
          >
            Create Your Free Account
          </Link>
        </div>
      </section>

      {/* STAY CONNECTED */}
      <section className="container-t01 py-20 md:py-24">
        <div className="text-center mb-12">
          <span className="section-tag">STAY CONNECTED</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-navy-900 mt-4">
            Stay Connected With T01
          </h2>
          <p className="text-navy-800/65 mt-3 text-lg">
            Follow us and never miss an update.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {socials.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="card p-6 hover:-translate-y-1 transition-transform duration-300"
            >
              <h3 className="font-extrabold text-lg text-navy-900 mb-2">
                {social.name}
              </h3>

              <p className="text-sm text-navy-800/65 leading-relaxed">
                {social.description}
              </p>

              <span className="inline-block mt-4 text-sm font-bold text-navy-900">
                Follow T01 →
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* FINAL BRAND MESSAGE */}
      <section className="bg-navy-900 text-cream-soft py-16">
        <div className="container-t01 text-center">
          <h2 className="text-2xl md:text-4xl font-extrabold">
            One Step at a Time. One Better Future at a Time.
          </h2>

          <p className="text-cream-soft/65 mt-5 text-lg">
            T01 — Your Growth, Our Purpose.
          </p>

          <p className="text-cream-soft/45 mt-3 text-sm">
            We started with a simple idea. We are building with a
            bigger purpose. And we hope to grow alongside every
            person who believes their future can be better.
          </p>
        </div>
      </section>

    </main>
  );
}

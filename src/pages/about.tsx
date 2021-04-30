import { NextPage, GetStaticProps } from "next";
import Head from "next/head";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import {
  Background,
  Logo,
  BackArrow,
  Container,
  Alignment,
  Title,
  Paragraph,
} from "../components/atoms";
import { Fade, FadeInAndOut } from "../containers";

const About: NextPage = () => {
  const { t } = useTranslation();
  return (
    <Background>
      <Head>
        <title>{`${t("about.title")} | Oh, that bridge!`}</title>
        <meta name="description" content={t("about.title")} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Logo />
      <BackArrow href="/" />

      <Fade>
        <Container>
          <Alignment.Horizontal>
            <FadeInAndOut>
              <Title as="h1" text={t("about.title")} />
            </FadeInAndOut>
          </Alignment.Horizontal>

          <Paragraph>
            Hi!
            <br />
            <br />
            <br />
            Welcome to <Title as="span" text="Oh, that bridge!" />, the page
            which aims to gather bridges from all around the world.
            <br />
            I'm very happy you've stopped by <Title as="span" text=":)" />
            <br />
            <br />
            This is actually the 2nd version of{" "}
            <Title as="span" text="Oh, that bridge!" />, but the reason to build
            it hasn't changed - to learn new things, to improve code, to write
            better and cleaner. The first version has been released in March
            2018. It focused on picture presentation and bridge locations (it
            has a Google map with markers implemented). I've created it because
            I wanted to better understand how React hooks work and how can you
            use them in GraphQL queries. It was also my first application with a
            public domain <Title as="span" text=":)" />
            <br />
            <br />
            In this <Title as="span" text="2.0" /> release I wanted to focus on
            several things:
            <br />
            - Animations and overall reception,
            <br />
            - User experience (I wanted to make it scroll-less, but after a
            while, I resigned),
            <br />
            - Simple and fast search mechanism
            <br />
            - Simpler maintenance
            <br />
            - Server side rendering
            <br />
            - SEO optimisation
            <br />
            - Improve my designing skills
            <br />
            <br />I hope you have noticed at least one of these things{" "}
            <Title as="span" text=":)" />
            <br />
            <br />
            I have already mentioned some technologies, so maybe let's take a
            deeper look into the tech-stack:
            <br />
            - <Title as="span" text="React" /> with{" "}
            <Title as="span" text="TypeScript" /> - I've been using TypeScript
            for a year now and I don't believe I would ever go back. The project
            is not complex, so I did not have to define many types, but anyway,
            it makes me feel comfortable.
            <br />
            - <Title as="span" text="NextJS" /> - Since I wanted to focus on
            SEO, NextJS was a natural choice. It turned out to be super
            programmer-friendly and also provides lots of optimization tools. So
            I did not have to care about the image optimization in order to keep
            the performance on a high level.
            <br />
            - <Title as="span" text="Firebase" /> with{" "}
            <Title as="span" text="Firestore" /> - Firebase is a great solution
            since all I have to do is to handle the requests in the NextJS API.
            In case I go for version 3.0, I'll already have the data{" "}
            <Title as="span" text=":)" />
            <br />
            - <Title as="span" text="Algolia" /> - this wasn't planned, but I
            realized it would be good to make a pleasant and friendly search.
            Since algolia is recommended (by firebase) search and discover
            platform I decided to give it a shot. I'm very happy with the result{" "}
            <Title as="span" text=":)" /> (but also, I only perform a simple
            search)
            <br />
            - <Title as="span" text="Framer Motion" /> with{" "}
            <Title as="span" text="React Intersection Observer" /> - at the
            beginning of 2021 I've seen my first video with Framer Motion. It
            seemed so simple and so powerful and I had to try it. I am not
            really sure yet what's the best way to build components using it,
            but maybe after a few weeks or months, I'll squeeze it somewhere in a
            project structure. React Intersection Observer works with Framer
            Motion out of the box! So you can achieve astonishing (or simply -
            nice) results with just a few lines of code. This is actually
            something I'm going to certainly remember from this project.
            <br />
            - <Title as="span" text="Atomic CSS" /> with{" "}
            <Title as="span" text="Styled components" />- huge credit to my work
            colleagues, who introduced it to me. It makes to project structure
            much cleaner and since I'm using styled-components I cannot think of
            a better pair.
            <br />
            <br />
            The entire code base is available here:{" "}
            <a href="https://github.com/barlima/oh-that-bridge-v2">
              <Title as="span" text="barlima/oh-that-bridge-v2" />{" "}
            </a>
            <br />
            Feel free to take a look, leave a comment or report an issue.
            <br />
            <br />
            <br />
            Hope you will find your bridges here!
            <br />
            <br />
            Bartek Perucki
          </Paragraph>
        </Container>
      </Fade>
    </Background>
  );
};

export default About;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
};

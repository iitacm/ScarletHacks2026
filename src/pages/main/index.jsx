import {
  Flex,
  Image,
  Text,
  Button,
  Box,
  VStack,
  Grid,
  Container,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Icon,
  Link,
  HStack,
  IconButton,
} from "@chakra-ui/react";
import MinimalistLogo from "../../assets/ScarletHacksMinimalistLogo.png";
import BGLogo from "../../assets/MinimalistLogoBG.png";
import RegisterIllustration from "../../assets/Register.png";
import track1 from "../../assets/track1.png";
import track2 from "../../assets/healthcareLogo.png";
import track3 from "../../assets/financeLogo.png";
import track4 from "../../assets/track4.png";
import eventPhoto1 from "../../scarlethacks2025/IMG_4499.jpg";
import eventPhoto2 from "../../scarlethacks2025/IMG_4480.jpg";
import eventPhoto3 from "../../scarlethacks2025/IMG_4472.jpg";
import bubblr from "../../assets/bubblr.png";
import desmos from "../../assets/DesmosLogo.png";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState, useMemo, useRef } from "react";
import { AddIcon, MinusIcon, ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import {
  FadeInLeft,
  FadeInBottom,
  FadeInRight,
} from "../../components/Animations";
import { useToast } from "@chakra-ui/react";
import emailjs from "@emailjs/browser";
import MLLogo from "../../assets/ML-logo.png";
import ShpeLogo from "../../assets/shpe_logo.png";
import { FaDiscord } from "react-icons/fa6";
import PrizesSection from "../../components/Prizes";
import { Map } from "../../components/Map";

const ScheduleItem = ({ time, event, location }) => (
  <Grid
    templateColumns="1fr auto"
    gap={{ base: "12", md: "20", lg: "20" }}
    w="100%"
  >
    <Flex>
      <Text lineHeight="26px" fontSize="2xl">
        {event}{" "}
        <Box
          as={"span"}
          backgroundColor={"#6b9fff"}
          borderRadius={"50%"}
          padding={"3px"}
          ml="5px"
        >
          <Text
            as={"span"}
            m={"0"}
            fontSize={"18px"}
            padding={"20px 5px"}
            color={"white"}
          >
            {location}
          </Text>
        </Box>
      </Text>
    </Flex>

    <Text lineHeight="26px" fontSize="2xl">
      {time}
    </Text>
  </Grid>
);

const DaySchedule = ({ day, date, events }) => (
  <Box w="100%">
    <Text color="brand.primary" fontSize="3xl" fontWeight={"600"}>
      DAY {day}
    </Text>
    <Text fontSize="2xl" mb={2} fontWeight={"600"}>
      {date}
    </Text>
    <VStack align="stretch" spacing={4}>
      {events.map((event, index) => (
        <ScheduleItem key={index} {...event} />
      ))}
    </VStack>
  </Box>
);

export const MainPage = () => {
  const navigate = useNavigate();
  const toast = useToast();

  const [timeLeft, setTimeLeft] = useState({
    days: "--",
    hours: "--",
    minutes: "--",
    seconds: "--",
  });

  const targetDate = new Date("2026-04-03T18:00:00").getTime();

  // Function to calculate the remaining time
  const calculateTimeLeft = () => {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance < 0) {
      return {
        days: "0",
        hours: "0",
        minutes: "0",
        seconds: "0",
      };
    }

    return {
      days: Math.floor(distance / (1000 * 60 * 60 * 24)),
      hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((distance % (1000 * 60)) / 1000),
    };
  };

  useEffect(() => {
    // Set the initial state
    setTimeLeft(calculateTimeLeft());

    // Update the countdown every second
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(timer);
  }, []);

  const scheduleData = {
    day1: {
      date: "Friday, April 3, 2026",
      events: [
        { event: "Check-in & Refreshments", time: "4:00 PM", location: "A" },
        { event: "Opening Ceremony", time: "6:00 PM", location: "A" },
        { event: "Team Formation", time: "7:00 PM", location: "C" },
        { event: "Hacking Starts", time: "8:00 PM", location: "C" },
        { event: "Dinner", time: "8:30 PM", location: "C" },
      ],
    },
    day2: {
      date: "Saturday, April 4, 2026",
      events: [
        { event: "Breakfast", time: "8:30 AM", location: "C" },
        { event: "Lunch", time: "1:00 PM", location: "C" },
        { event: "Dinner", time: "6:00 PM", location: "C" },
      ],
    },
    day3: {
      date: "Sunday, April 5, 2026",
      events: [
        { event: "Breakfast", time: "8:00 AM", location: "C" },
        { event: "Hacking Ends", time: "8:00 AM", location: "C" },
        { event: "Judging", time: "10:00 AM", location: "C" },
        { event: "Lunch", time: "1:00 PM", location: "C" },
        { event: "Closing ceremony", time: "2:00 PM", location: "A" },
        { event: "Awards", time: "3:00 PM", location: "A" },
      ],
    },
  };

  const faqData = [
    {
      question: "What is ScarletHacks?",
      answer:
        "ScarletHacks is Illinois Tech's biggest annual hackathon, uniting students from across the Chicagoland area to innovate, collaborate, and tackle real-world challenges through technology.",
    },
    {
      question: "When is ScarletHacks?",
      answer: "April 3rd - 5th, 2026.",
    },
    {
      question: "What's the cost?",
      answer:
        "Admission is free and includes mentors, food, swag, resources, and so much more!",
    },
    {
      question: "Can I attend ScarletHacks virtually?",
      answer: "Unfortunately, ScarletHacks is an in-person only hackathon.",
    },
    {
      question: "Who can register?",
      answer:
        "This event is open to anyone of all skill levels - and it's all free!",
    },
    {
      question: "How many people can be on a team?",
      answer: "Between 1 and 4 people can be on a single team.",
    },
    {
      question: "Where is the event held?",
      answer:
        "The event is held in the Stuart Building at Illinois Tech campus.",
    },
  ];

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    school: "",
    phone: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);

    const templateParams = {
      user_first_name: formData.firstName,
      user_last_name: formData.lastName,
      user_email: formData.email,
      user_school: formData.school,
      user_phone: formData.phone,
      user_message: formData.message,
    };

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    emailjs
      .send(serviceId, templateId, templateParams, {
        publicKey: publicKey,
      })
      .then(
        () => {
          console.log("SUCCESS!");
          toast({
            title: "Message sent successfully!",
            description: "We'll get back to you soon.",
            status: "success",
            duration: 2000,
            isClosable: true,
            position: "top",
          });
          setFormData({
            firstName: "",
            lastName: "",
            school: "",
            phone: "",
            email: "",
            message: "",
          });
        },
        (error) => {
          console.log("FAILED...", error);
          toast({
            title: "Failed to send message",
            description: "Please try again later.",
            status: "error",
            duration: 2000,
            isClosable: true,
            position: "top",
          });
        }
      );
  };

  const [errors, setErrors] = useState({});

  const isFormValid = useMemo(() => {
    return (
      formData.firstName.trim() !== "" &&
      formData.lastName.trim() !== "" &&
      formData.school.trim() !== "" &&
      formData.message.trim() !== "" &&
      formData.email.trim() !== "" &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    );
  }, [
    formData.firstName,
    formData.lastName,
    formData.school,
    formData.email,
    formData.message,
  ]);

  const handleSponsorEmail = () => {
    window.location.href = "mailto:sponsor@scarlethacks.com";
  };

  const handleContactEmail = () => {
    window.location.href = "mailto:contact@scarlethacks.com";
  };

  const sponsorsData = [
    {
      image: bubblr,
      alt: "Bubblr",
      link: "https://www.drinkbubblr.com/",
    },
    {
      image: MLLogo,
      alt: "ML@IIT",
      link: "https://www.linkedin.com/company/ml-at-iit/about/",
    },
    {
      image: desmos,
      alt: "Desmos",
      link: "https://www.desmos.com/",
    },
    {
      image: ShpeLogo,
      alt: "SHPE",
      link: "https://www.instagram.com/shpe_iit/",
    },
  ];

  // --- CAROUSEL DATA & LOGIC ---
  const carouselRef = useRef(null);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  // Add more items here! The carousel will automatically expand to fit them.
  const previousEventsData = [
    {
      id: 1,
      image: eventPhoto1,
      alt: "Previous Event Photo 1",
    },
    {
      id: 2,
      image: eventPhoto2,
      alt: "Previous Event Photo 2",
    },
    {
      id: 3,
      image: eventPhoto3,
      alt: "Previous Event Photo 3",
    },
  ];
  // -----------------------------

  const eventLocations = [
    {
      marker: "A",
      name: "Wishnick Hall, South Dearborn Street, Chicago, IL",
      map: "https://maps.app.goo.gl/fibESJDoq6tRkzfT7",
    },
    {
      marker: "B",
      name: "McCormick Tribune Campus Center (MTCC)",
      map: "https://maps.app.goo.gl/AFtndaxTzeAJfVLp9",
    },
    {
      marker: "C",
      name: "Stuart Building, Chicago, IL",
      map: "https://maps.app.goo.gl/EzPY1JPdUyFaeQrd6",
    },
    {
      marker: "D",
      name: "Paul V. Galvin Library, West 33rd Street, Chicago, IL",
      map: "https://maps.app.goo.gl/H9sddgJYvjTTbxRA6",
    },
  ];

  return (
    <Flex w="100%" flexDirection={"column"} position={"relative"}>
      {/* INFO & LOGO */}
      <Flex
        w="100%"
        flexDirection={"row"}
        justifyContent={"space-between"}
        position={"relative"}
        overflow={"hidden"}
        id="aboutSection"
      >
        <Flex
          _before={{
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            w: "100%",
            h: "100%",
            bgImage: { base: `url(${MinimalistLogo})`, md: "none" },
            bgRepeat: "no-repeat",
            bgPosition: "center",
            opacity: 0.2,
            zIndex: -1,
            display: { base: "block", md: "none" },
            bgSize: "contain",
          }}
          justifyContent={"space-between"}
        >
          <VStack
            alignItems={{ base: "center", md: "flex-start" }}
            justifyContent={"center"}
            gap={"15px"}
            w={{ base: "100%", md: "45%" }}
            h={{ base: "500px", md: "auto" }}
          >
            <Text
              fontSize={"3xl"}
              fontWeight={"400"}
              lineHeight={"35px"}
              textAlign={{ base: "center", md: "left" }}
            >
              <Text
                as="span"
                textTransform={"uppercase"}
                color={"brand.primary"}
                fontWeight={"700"}
              >
                Scarlet Hacks,{" "}
              </Text>
              Illinois Tech's biggest hackathon, empowers students to create
              tech solutions for sustainability and social equity, driving
              innovation and meaningful impact.
            </Text>
            <Text fontSize={"3xl"} color={"brand.primary"} fontWeight={"700"}>
              April 3-5, 2026
            </Text>
            <Link href="https://forms.office.com/r/TVd5KinnhW" target="_blank">
              <Button
                variant={"custom"}
                letterSpacing={"1px"}
                textTransform="uppercase"
                size="lg"
                width={"200px"}
                fontSize={"xl"}
                _hover={{ bg: "red.700" }}
              >
                Register
              </Button>
            </Link>

            <a href="/SponsorshipPackage_ScarletHacks2026-4.pdf" target="_blank">
              <Button
                variant={"custom"}
                letterSpacing={"1px"}
                textTransform="uppercase"
                size="lg"
                width={"200px"}
                fontSize={"xl"}
                backgroundColor={"purple"}
                _hover={{ bg: "orange.700" }}
              >
                Sponsor Us
              </Button>
            </a>
            <HStack color={"brand.primary"} spacing={4}>
              <Link
                href="https://discord.gg/kETeAJuzbt"
                target="_blank"
                color={"brand.primary"}
                fontSize={"2xl"}
                textDecoration={"none"}
                _hover={{
                  textDecoration: "underline",
                  color: "red.700",
                  transform: "scale(1.02)",
                }}
                transition="all 0.3s ease"
                ml="5px"
              >
                Join our Discord
              </Link>
              <FaDiscord fontSize={"28px"} />
            </HStack>
          </VStack>

          <Flex
            justifyContent={"center"}
            w={"45%"}
            h={"50%"}
            flexWrap={"wrap"}
            display={{ base: "none", md: "flex" }}
            alignItems={"center"}
          >
            <Image
              src={MinimalistLogo}
              alt="ScarletHacks2025MinimalistLogo"
              w={"100%"}
              maxWidth={"600px"}
            />
          </Flex>
        </Flex>
      </Flex>
      <Image
        src={BGLogo}
        alt="ScarletHacks2025MinimalistLogo"
        position={"absolute"}
        top={{ base: "250px", md: "350px", lg: "500" }}
        left={{ base: "-120px", md: "-190px", lg: "-210px" }}
        zIndex={-1}
        opacity={0.5}
        maxW={{ base: "100px", md: "200px" }}
      />
      {/* COUNTDOWN CLOCK */}
      <FadeInBottom>
        <Flex
          justifyContent={"center"}
          alignItems={"center"}
          gap={{ base: "10px", md: "25px" }}
          margin={"50px 0px 0px 0px"}
          w="100%"
        >
          <Flex
            w={{ base: "80px", md: "150px", lg: "180px" }}
            h={{ base: "80px", md: "150px", lg: "180px" }}
            bgColor={"brand.tertiary"}
            alignItems={"center"}
            justifyContent={"center"}
            position={"relative"}
            borderRadius={"5px"}
          >
            <Text
              fontSize={{ base: "3xl", md: "5xl", lg: "8xl" }}
              color={"brand.primary"}
              fontWeight={"500"}
            >
              {timeLeft.days ?? "00"}
            </Text>
            <Text
              textTransform={"uppercase"}
              textAlign={"end"}
              position={"absolute"}
              bottom={"0"}
              right={"0"}
              margin={{ base: "3px", md: "10px" }}
              fontWeight={"500"}
              fontSize={{ base: "xs", md: "lg", lg: "xl" }}
            >
              days
            </Text>
          </Flex>
          <Flex
            w={{ base: "80px", md: "150px", lg: "180px" }}
            h={{ base: "80px", md: "150px", lg: "180px" }}
            bgColor={"brand.tertiary"}
            alignItems={"center"}
            justifyContent={"center"}
            position={"relative"}
            borderRadius={"5px"}
          >
            <Text
              fontSize={{ base: "3xl", md: "5xl", lg: "8xl" }}
              color={"brand.primary"}
              fontWeight={"500"}
            >
              {timeLeft.hours ?? "00"}
            </Text>
            <Text
              textTransform={"uppercase"}
              textAlign={"end"}
              position={"absolute"}
              bottom={"0"}
              right={"0"}
              margin={{ base: "3px", md: "10px" }}
              fontWeight={"500"}
              fontSize={{ base: "xs", md: "lg", lg: "xl" }}
            >
              hours
            </Text>
          </Flex>
          <Flex
            w={{ base: "80px", md: "150px", lg: "180px" }}
            h={{ base: "80px", md: "150px", lg: "180px" }}
            bgColor={"brand.tertiary"}
            alignItems={"center"}
            justifyContent={"center"}
            position={"relative"}
            borderRadius={"5px"}
          >
            <Text
              fontSize={{ base: "3xl", md: "5xl", lg: "8xl" }}
              color={"brand.primary"}
              fontWeight={"500"}
            >
              {timeLeft.minutes ?? "00"}
            </Text>
            <Text
              textTransform={"uppercase"}
              textAlign={"end"}
              position={"absolute"}
              bottom={"0"}
              right={"0"}
              margin={{ base: "3px", md: "10px" }}
              fontWeight={"500"}
              fontSize={{ base: "xs", md: "lg", lg: "xl" }}
            >
              minutes
            </Text>
          </Flex>
          <Flex
            w={{ base: "80px", md: "150px", lg: "180px" }}
            h={{ base: "80px", md: "150px", lg: "180px" }}
            bgColor={"brand.tertiary"}
            alignItems={"center"}
            justifyContent={"center"}
            position={"relative"}
            borderRadius={"5px"}
          >
            <Text
              fontSize={{ base: "3xl", md: "5xl", lg: "8xl" }}
              color={"brand.primary"}
              fontWeight={"500"}
            >
              {timeLeft.seconds ?? "00"}
            </Text>
            <Text
              textTransform={"uppercase"}
              textAlign={"end"}
              position={"absolute"}
              bottom={"0"}
              right={"0"}
              margin={{ base: "3px", md: "10px" }}
              fontWeight={"500"}
              fontSize={{ base: "xs", md: "lg", lg: "xl" }}
            >
              seconds
            </Text>
          </Flex>
        </Flex>
      </FadeInBottom>
      <Image
        src={BGLogo}
        alt="ScarletHacks2025MinimalistLogo"
        maxWidth={"200px"}
        position={"absolute"}
        top={{ base: "450px", md: "550px", lg: "800" }}
        right={{ base: "-120px", md: "-180px", lg: "-220px" }}
        zIndex={-1}
        opacity={0.5}
        maxW={{ base: "100px", md: "200px" }}
      />
      {/* TRACKS */}
      <Flex
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        margin={"50px 0px 0px 0px"}
        gap={"20px"}
        id="tracksSection"
      >
        <FadeInBottom>
          <Text
            fontSize={"4xl"}
            fontWeight={"600"}
            color={"brand.primary"}
            textAlign={"center"}
            margin={"0"}
            textTransform={"uppercase"}
            letterSpacing={"3px"}
            w={"100%"}
          >
            Tracks
          </Text>
        </FadeInBottom>

        <FadeInRight>
          <Flex
            flexDirection={{ base: "column", md: "row" }}
            justifyContent={"center"}
            alignItems={"center"}
            gap={"20px"}
            w="100%"
            maxWidth={"1000px"}
            px={{ base: 8, md: 0 }}
          >
            <VStack
              align="flex-start"
              spacing={6}
              maxWidth={"600px"}
              alignItems={"center"}
            >
              <Text
                color="brand.primary"
                fontSize="3xl"
                fontWeight={"500"}
                textAlign={"center"}
              >
                Healthcare
              </Text>
              <Image
                src={track2}
                alt="social-equity-and-inclusion-image"
                maxWidth={"250px"}
                display={{ base: "block", md: "none" }}
              />
              <Text fontSize="2xl">
                Hack the future of healthcare by building bold solutions to real challenges
                 faced by patients and providers.
              </Text>
              <Text fontSize="2xl">
                Whether it’s smarter diagnostics, better care
                 coordination, or scalable digital tools, this track is all about impact at scale.
              </Text>
            </VStack>
            <Image
              src={track2}
              alt="social-equity-and-inclusion-image"
              maxW={{ base: "200px", md: "300px", lg: "400px" }}
              display={{ base: "none", md: "block" }}
            />
          </Flex>
        </FadeInRight>
        
        <FadeInLeft>
          <Flex
            flexDirection={{ base: "column", md: "row" }}
            justifyContent={"center"}
            alignItems={"center"}
            gap={"100px"}
            w="100%"
            maxWidth={"1000px"}
            px={{ base: 8, md: 0 }}
          >
            <Image
              src={track3}
              alt="evironment-sustainability-image"
              maxW={{ base: "200px", md: "300px", lg: "400px" }}
              display={{ base: "none", md: "block" }}
            />
            <VStack
              align="flex-start"
              spacing={6}
              maxWidth={"600px"}
              alignItems={"center"}
            >
              <Text
                color="brand.primary"
                fontSize="3xl"
                fontWeight={"500"}
                textAlign={"center"}
              >
                Finance
              </Text>
              <Image
                src={track3}
                alt="evironment-sustainability-image"
                maxWidth={"250px"}
                display={{ base: "block", md: "none" }}
              />
              <Text fontSize="2xl">
                Create powerful fintech solutions that simplify money management and
                 expand financial access.
              </Text>
              <Text fontSize="2xl">
                Whether it's AI-driven insights, crypto innovation, or 
                smarter banking tools, turn bold ideas into real-world impact.
              </Text>
            </VStack>
          </Flex>
        </FadeInLeft>

        <FadeInRight>
          <Flex
            flexDirection={{ base: "column", md: "row" }}
            justifyContent={"center"}
            alignItems={"center"}
            gap={"20px"}
            w="100%"
            maxWidth={"1000px"}
            px={{ base: 8, md: 0 }}
          >
            <VStack
              align="flex-start"
              spacing={6}
              maxWidth={"600px"}
              alignItems={"center"}
            >
              <Text
                color="brand.primary"
                fontSize="3xl"
                fontWeight={"500"}
                textAlign={"center"}
              >
                Corporate Innovation
              </Text>
              <Image
                src={track4}
                alt="social-equity-and-inclusion-image"
                maxWidth={"250px"}
                display={{ base: "block", md: "none" }}
              />
              <Text fontSize="2xl">
                Design forward-thinking solutions that help enterprises adapt, automate, and lead.
              </Text>
              <Text fontSize="2xl">
                Tackle real-world challenges in workflow optimization, data strategy, 
                AI integration, and operational efficiency.
              </Text>
            </VStack>
            <Image
              src={track4}
              alt="social-equity-and-inclusion-image"
              maxW={{ base: "200px", md: "300px", lg: "400px" }}
              display={{ base: "none", md: "block" }}
            />
          </Flex>
        </FadeInRight>

        <FadeInLeft>
          <Flex
            flexDirection={{ base: "column", md: "row" }}
            justifyContent={"center"}
            alignItems={"center"}
            gap={"100px"}
            w="100%"
            maxWidth={"1000px"}
            px={{ base: 8, md: 0 }}
          >
            <Image
              src={track1}
              alt="evironment-sustainability-image"
              maxW={{ base: "200px", md: "300px", lg: "400px" }}
              display={{ base: "none", md: "block" }}
            />
            <VStack
              align="flex-start"
              spacing={6}
              maxWidth={"600px"}
              alignItems={"center"}
            >
              <Text
                color="brand.primary"
                fontSize="3xl"
                fontWeight={"500"}
                textAlign={"center"}
              >
                Environmental Sustainability
              </Text>
              <Image
                src={track1}
                alt="evironment-sustainability-image"
                maxWidth={"250px"}
                display={{ base: "block", md: "none" }}
              />
              <Text fontSize="2xl">
                Projects in this track target pressing environmental issues,
                encouraging innovations that contribute to a healthier planet.
              </Text>
              <Text fontSize="2xl">
                Examples include clean energy, waste reduction, sustainable
                agriculture, and climate change mitigation.
              </Text>
            </VStack>
          </Flex>
        </FadeInLeft>

      </Flex>
      {/* SCHEDULE */}
      <FadeInBottom>
        <Flex
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          margin={"50px 0px 0px 0px"}
          gap={"20px"}
          id="scheduleSection"
          w="100%"
        >
          <Text
            fontSize={"4xl"}
            fontWeight={"600"}
            color={"brand.primary"}
            textAlign={"center"}
            margin={"0"}
            textTransform={"uppercase"}
            letterSpacing={"3px"}
          >
            Schedule
          </Text>

          <Grid
            templateColumns={{ base: "1fr", md: "1fr 1fr" }}
            gap={{ base: "12", md: "16", lg: "24" }}
            maxWidth={"1000px"}
            w="100%"
            px={{ base: 8, md: 0 }}
          >
            <DaySchedule day="1" {...scheduleData.day1} />
            <DaySchedule day="2" {...scheduleData.day2} />
            <DaySchedule day="3" {...scheduleData.day3} />
          </Grid>
          <Flex
            justifyContent={"flex-start"}
            gap={"20px"}
            direction={"column"}
            mt="30px"
            px={{ base: 8, md: 0 }}
          >
            {eventLocations.map((location) => (
              <Flex
                key={location.marker}
                alignItems={"center"}
                justifyContent={""}
              >
                <Box
                  backgroundColor={"#6b9fff"}
                  borderRadius={"50%"}
                  padding={"3px"}
                  ml="5px"
                  mr="10px"
                  w="30px"
                >
                  <Text
                    as={"span"}
                    m={"0"}
                    fontSize={"18px"}
                    padding={"22px 7px"}
                    color={"white"}
                  >
                    {location.marker}
                  </Text>
                </Box>
                <Link href={location.map} isExternal>
                  <Text color={"brand.primary"} fontSize={"18px"}>
                    {location.name}
                  </Text>
                </Link>
              </Flex>
            ))}
            <Text textAlign={"center"} fontStyle={"italic"}>
              Check the map below for directions
            </Text>
          </Flex>
        </Flex>
      </FadeInBottom>
      {/* PRIZES */}
      <FadeInBottom>
        <Flex
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          margin={"50px 0px 0px 0px"}
          gap={"20px"}
          id="prizesSection"
          w="100%"
        >
          <Text
            fontSize={"4xl"}
            fontWeight={"600"}
            color={"brand.primary"}
            textAlign={"center"}
            margin={"0"}
            textTransform={"uppercase"}
            letterSpacing={"3px"}
          >
            Prizes
          </Text>
          <PrizesSection />
        </Flex>
      </FadeInBottom>
      {/* SPONSORS */}
      <FadeInBottom>
        <Flex
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          margin={"50px 0px 0px 0px"}
          gap={"20px"}
          id="sponsorsSection"
          w="100%"
        >
          <Text
            fontSize={"4xl"}
            fontWeight={"600"}
            color={"brand.primary"}
            textAlign={"center"}
            margin={"0"}
            textTransform={"uppercase"}
            letterSpacing={"3px"}
          >
            Sponsors
          </Text>
          <Flex
            wrap="wrap"
            justifyContent="center"
            gap={12}
            alignItems={"center"}
          >
             <Text sx={{fontSize: "2.5em", marginTop: "-0.3em", textAlign: "center"}}>Coming Soon...</Text>
            {/* {sponsorsData.map((sponsor, index) => (
              <Link key={index} href={sponsor.link} isExternal>
                <Image
                  src={sponsor.image}
                  alt={sponsor.alt}
                  maxW={{ base: "200px", md: "300px" }}
                  transition="transform 0.3s ease-in-out"
                  _hover={{ transform: "scale(1.04)" }}
                />
              </Link>
            ))} */}
          </Flex>
          {/* Co-Hosts block */}
          <Text
            fontSize={"4xl"}
            fontWeight={"600"}
            color={"brand.primary"}
            textAlign={"center"}
            margin={"0"}
            textTransform={"uppercase"}
            letterSpacing={"3px"}
          >
            Co-Hosts
          </Text>
          <Flex
            wrap="wrap"
            justifyContent="center"
            gap={12}
            alignItems={"center"}
          >
             <Text sx={{fontSize: "2.5em", marginTop: "-0.3em", textAlign: "center"}}>Coming Soon...</Text>
            {/* {sponsorsData.map((sponsor, index) => (
              <Link key={index} href={sponsor.link} isExternal>
                <Image
                  src={sponsor.image}
                  alt={sponsor.alt}
                  maxW={{ base: "200px", md: "300px" }}
                  transition="transform 0.3s ease-in-out"
                  _hover={{ transform: "scale(1.04)" }}
                />
              </Link>
            ))} */}
          </Flex>
          <Box textAlign={"center"}>
            <Text as="span" fontSize="2xl" textAlign="center" margin={"auto"}>
              Interested in being a sponsor? <br />
              Email us on{" "}
            </Text>
            <Link href="mailto:acm@iit.edu">
              <Text
                as="span"
                color={"brand.primary"}
                fontSize="2xl"
                textDecoration={"underline"}
              >
                acm@illinoistech.edu
              </Text>
            </Link>
          </Box>
          <Button
            variant="custom"
            letterSpacing={"1px"}
            textTransform="uppercase"
            size={"lg"}
            _hover={{ bg: "red.700" }}
            onClick={handleSponsorEmail}
            boxShadow="sm"
          >
            Become a Sponsor
          </Button>
        </Flex>
      </FadeInBottom>
      
      {/* --- UPDATED: PREVIOUS EVENTS CAROUSEL --- */}
      <FadeInBottom>
        <Flex
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          margin={"50px 0px 0px 0px"}
          gap={"20px"}
          id="previousEventsSection"
          w="100%"
        >
          <Text
            fontSize={"4xl"}
            fontWeight={"600"}
            color={"brand.primary"}
            textAlign={"center"}
            margin={"0"}
            textTransform={"uppercase"}
            letterSpacing={"3px"}
          >
            Previous Events
          </Text>

          <Box position="relative" w="100%" maxW="1000px" mx="auto" px={{ base: 4, md: 10 }} mt={4}>
            {/* Left Scroll Button */}
            <IconButton
              icon={<ChevronLeftIcon fontSize="3xl" />}
              position="absolute"
              left={{ base: "0", md: "10px" }}
              top="50%"
              transform="translateY(-50%)"
              zIndex="2"
              onClick={scrollLeft}
              aria-label="Scroll left"
              bg="white"
              color="brand.primary"
              boxShadow="md"
              isRound
              _hover={{ bg: "gray.100" }}
              display={{ base: "none", md: "flex" }} // Hide arrows on mobile where users can easily swipe
            />

            {/* Scrollable Container */}
            <Flex
              ref={carouselRef}
              overflowX="auto"
              scrollSnapType="x mandatory"
              gap={6}
              pb={4} // Padding for box shadow
              css={{
                "&::-webkit-scrollbar": { display: "none" },
                msOverflowStyle: "none",
                scrollbarWidth: "none",
              }}
            >
              {previousEventsData.map((event) => (
                <Box
                  key={event.id}
                  minW={{ base: "100%", md: "calc(100% / 3 - 16px)" }} // Shows 1 image on mobile, 3 on desktop
                  h="250px"
                  bg="gray.100"
                  borderRadius="md"
                  overflow="hidden"
                  boxShadow="md"
                  scrollSnapAlign="start"
                  flexShrink={0}
                  transition="transform 0.3s ease"
                  _hover={{ transform: "scale(1.02)" }}
                >
                  <Image
                    src={event.image}
                    alt={event.alt}
                    objectFit="cover"
                    w="100%"
                    h="100%"
                  />
                </Box>
              ))}
            </Flex>

            {/* Right Scroll Button */}
            <IconButton
              icon={<ChevronRightIcon fontSize="3xl" />}
              position="absolute"
              right={{ base: "0", md: "10px" }}
              top="50%"
              transform="translateY(-50%)"
              zIndex="2"
              onClick={scrollRight}
              aria-label="Scroll right"
              bg="white"
              color="brand.primary"
              boxShadow="md"
              isRound
              _hover={{ bg: "gray.100" }}
              display={{ base: "none", md: "flex" }}
            />
          </Box>
        </Flex>
      </FadeInBottom>
      {/* ----------------------------------------- */}

      {/* CONTACT US */}
      <FadeInBottom>
        <Flex
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          margin={"50px 0px 0px 0px"}
          gap={"20px"}
          id="contactUsSection"
          w="100%"
        >
          <Text
            fontSize={"4xl"}
            fontWeight={"600"}
            color={"brand.primary"}
            textAlign={"center"}
            margin={"0"}
            textTransform={"uppercase"}
            letterSpacing={"3px"}
          >
            Contact us
          </Text>
          <Container maxW="1000px" py={0} textAlign={"center"}>
            <Box textAlign={"center"}>
              <Text as="span" fontSize="2xl" textAlign="center" margin={"auto"}>
                Got questions? We've got answers! <br />
                Reach out to us at{" "}
              </Text>
              <Link href="mailto:acm@iit.edu">
                <Text
                  as="span"
                  color={"brand.primary"}
                  fontSize="2xl"
                  textDecoration={"underline"}
                >
                  acm@illinoistech.edu
                </Text>
              </Link>
            </Box>
            <Button
              variant="custom"
              letterSpacing={"1px"}
              textTransform="uppercase"
              size={"lg"}
              _hover={{ bg: "red.700" }}
              onClick={handleContactEmail}
              mt="20px"
              boxShadow="sm"
            >
              Contact Us
            </Button>
          </Container>
        </Flex>
      </FadeInBottom>
      {/* FAQ */}
      <FadeInBottom>
        <Flex
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          margin={"50px 0px 0px 0px"}
          gap={"20px"}
          id="faqsSection"
          w="100%"
        >
          <Text
            fontSize={"4xl"}
            fontWeight={"600"}
            color={"brand.primary"}
            textAlign={"center"}
            margin={"0"}
            textTransform={"uppercase"}
            letterSpacing={"3px"}
          >
            FAQs
          </Text>
          <Container maxW="1000px" px={{ base: 8, md: 0 }}>
            <Accordion allowToggle>
              {faqData.map((faq, index) => (
                <AccordionItem key={index} border="none">
                  {({ isExpanded }) => (
                    <>
                      <AccordionButton
                        p={4}
                        _hover={{ bg: "transparent" }}
                        _expanded={{ bg: "transparent" }}
                      >
                        <Box flex="1" textAlign="left">
                          <Text fontSize="2xl" fontWeight="medium">
                            {faq.question}
                          </Text>
                        </Box>
                        <Icon
                          as={isExpanded ? MinusIcon : AddIcon}
                          fontSize="20px"
                        />
                      </AccordionButton>
                      <AccordionPanel pb={4}>
                        <Text fontSize="xl">{faq.answer}</Text>
                      </AccordionPanel>
                    </>
                  )}
                </AccordionItem>
              ))}
            </Accordion>
          </Container>
        </Flex>
      </FadeInBottom>
      {/* REGISTER */}
      <FadeInBottom>
        <Flex
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          margin={"50px 0px"}
          gap={"20px"}
          w="100%"
        >
          <Container maxW="1000px" px={{ base: 10, md: 4 }}>
            <Flex
              direction={{ base: "column-reverse", md: "row" }}
              align="center"
              justify="space-between"
              gap={8}
            >
              <Box maxW="550px">
                <Text fontSize="2xl" mb={4}>
                  Don't miss out on Illinois Tech's biggest hackathon, unleash
                  your creativity and make an impact!
                </Text>
                <Text fontSize="2xl" mb={6}>
                  Register now if you haven't already!
                </Text>
                <Link
                  href="https://forms.office.com/r/SngGaAkhZR"
                  target="_blank"
                >
                  <Button
                    variant={"custom"}
                    size="lg"
                    bg="brand.primary"
                    color="white"
                    _hover={{ bg: "red.700" }}
                    w="100%"
                    letterSpacing={"1px"}
                    textTransform="uppercase"
                  >
                    Register
                  </Button>
                </Link>
              </Box>
              <Image
                src={RegisterIllustration}
                alt="People walking"
                maxW={{ base: "300px", md: "350px" }}
              />
            </Flex>
          </Container>
        </Flex>
      </FadeInBottom>

      {/* Map */}
      <FadeInBottom>
        <Flex
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          margin={{ base: "10px", md: "50px" }}
          gap={"20px"}
          w="100%"
        >
          <Map />
        </Flex>
      </FadeInBottom>
    </Flex>
  );
};
import video from "../assets/videoplayback.mp4";


const HeroSection = () => {
  return (
    <div className="flex flex-col items-center mt-6 lg:mt-10">
      <h1 className="text-4xl sm:text-6xl lg:text-7xl text-center tracking-wide">
        L’espace de travail alimenté par l’IA qui s’adapte à vous.
      </h1>
      <p className="mt-10 text-lg text-center text-neutral-500 max-w-4xl">
        Un seul espace qui permet aux équipes d’obtenir les réponses dont elles ont besoin, d’automatiser certaines tâches et de mener à bien leurs projets.
      </p>
      <div className="flex justify-center my-10">
        <a
          href="#" className="bg-gradient-to-r from-blue-300 to-blue-400 py-3 px-4 mx-3 rounded-md ">
          Essayer Notion gratuitement
        </a>
        <a href="#" className="py-3 px-4 mx-3 rounded-md border-2">
          Demander un démo
        </a>
      </div>
      <div className="flex mt-10 justify-center">
        <video
          autoPlay
          loop
          muted
          className="rounded-lg w-1/2 border border-blue-400 shadow-sm shadow-blue-300 mx-2 my-4"
        >
          <source src={video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <video
          autoPlay
          loop
          muted
          className="rounded-lg w-1/2 border border-blue-400 shadow-sm shadow-blue-300 mx-2 my-4"
        >
          <source src={video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default HeroSection;

import Loader from "@/components/Loader/Loader";

const Loading = () => {
  return (
    <Loader
      size={60}
      thickness={6}
      color="#ffb385"
      borderColor="rgba(255, 179, 133, 0.3)"
      shadowColor="rgba(255, 179, 133, 0.5)"
      innerSize={50}
      innerThickness={4}
      innerColor="#ffe5d1"
      innerBorderColor="rgba(255, 229, 209, 0.2)"
    />
  );
};

export default Loading;

import ThemeImage from "@/components/ui/theme-image";
import { images } from "@/constant/images";

const ThemeImageDemo = () => {
  return (
    <div>
      <ThemeImage
        darkSrc={images.readDark}
        lightSrc={images.readlight}
        alt="image"
        height={500}
        width={800}
        className="w-full"
      />
    </div>
  );
};

export default ThemeImageDemo;

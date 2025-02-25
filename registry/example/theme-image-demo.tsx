import { images } from "@/constant/images"

import { ThemeImage } from "../reusables/ui/theme-image"

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
  )
}

export default ThemeImageDemo

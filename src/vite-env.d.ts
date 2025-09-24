/// <reference types="vite/client" />
// Declaración para el custom element <model-viewer>
declare namespace JSX {
  interface IntrinsicElements {
    'model-viewer': React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement>,
      HTMLElement
    > & {
      src?: string;
      poster?: string;
      alt?: string;
      ar?: boolean | string;
      arModes?: string;
      cameraControls?: boolean | string;
      autoRotate?: boolean | string;
      autoplay?: boolean | string;
      exposure?: number | string;
      toneMapping?: string;
      shadowIntensity?: number | string;
      disableZoom?: boolean | string;
      interactionPrompt?: string;
      environmentImage?: string;
      skyboxImage?: string;
      cameraOrbit?: string;
      fieldOfView?: string;
      minCameraOrbit?: string;
      maxCameraOrbit?: string;
      minFieldOfView?: string;
      maxFieldOfView?: string;
      reveal?: string;
      iosSrc?: string;
      loading?: string;
      arScale?: string;
      arPlacement?: string;
      [key: string]: any;
    };
  }
}

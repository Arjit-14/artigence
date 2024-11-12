import React, { useEffect, useRef, useState } from "react";
import OpenSeadragon from "openseadragon";
import { ZoomInIcon, ZoomOutIcon, HomeIcon, ArrowsExpandIcon } from "@heroicons/react/outline";
import "./ImageViewer.css";

const ImageViewer = ({ setCurrentPage }) => {
  const mainViewerRef = useRef(null);
  const navigatorContainerRef = useRef(null);
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    mainViewerRef.current = OpenSeadragon({
      id: "main-viewer",
      prefixUrl: "/images/",
      tileSources: [
        "https://cache.zoomhub.net/content/MVKk9.dzi",
        "https://cache.zoomhub.net/content/LK8om.dzi",
        "https://cache.zoomhub.net/content/w2DNl.dzi"
      ],
      sequenceMode: true,
      defaultZoomLevel: 0,
      minZoomLevel: 0,
      immediateRender: true,
      maxZoomPixelRatio: 20,
      timeout: 5000,
      blendTime: 0.1,
      pixelsPerWheelLine: 30,

      showNavigator: true,
      navigatorPosition: "ABSOLUTE",
      navigatorTop: "0px",
      navigatorLeft: "80%",
      navigatorHeight: "40%",
      navigatorWidth: "35%",
      navigatorAutoFade: false,
      smoothTileEdgesMinZoom: 1,

      showZoomControl: false,
      showHomeControl: false,
      showFullPageControl: false,

      gestureSettingsTouch: {
        pinch: true,
        doubletap: true,
      },
      gestureSettingsMouse: {
        clickToZoom: true,
        scrollToZoom: true,
        dblClickToZoom: true,
      },
      
      navigatorContainer: navigatorContainerRef.current,
    });

    mainViewerRef.current.addHandler("page", (event) => {
      setCurrentPage(event.page);  // Update currentPage whenever the viewer changes images
    });

    const handleFullScreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullScreenChange);
    return () => {
      if (mainViewerRef.current) mainViewerRef.current.destroy();
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
    };
  }, [setCurrentPage]);

  const zoomIn = () => {
    if (mainViewerRef.current && mainViewerRef.current.viewport) {
      mainViewerRef.current.viewport.zoomBy(2);
      mainViewerRef.current.viewport.applyConstraints();
    }
  };

  const zoomOut = () => {
    if (mainViewerRef.current && mainViewerRef.current.viewport) {
      mainViewerRef.current.viewport.zoomBy(0.4);
      mainViewerRef.current.viewport.applyConstraints();
    }
  };

  const home = () => {
    if (mainViewerRef.current && mainViewerRef.current.viewport) {
      mainViewerRef.current.viewport.goHome();
    }
  };

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error("Error attempting to enter fullscreen mode:", err);
      });
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <div className="flex h-full w-full">
      <div id="main-viewer" className="h-full w-full"></div>

      <div
        ref={navigatorContainerRef}
        className="w-1/4 p-2 bg-gray-100 m-4"
        id="hubview-navigator"
        style={{ height: '25vh' }}
      >
        <div className="flex justify-center text-sm text-gray-700 font-bold">
          Hub View
        </div>
      </div>

      {/* Control buttons with icons */}
      <div
        className={`fixed top-2 left-1/2 transform -translate-x-1/2 flex gap-2 p-1 bg-gray-100 rounded-md shadow-md ${
          isFullScreen ? "fullscreen-button" : ""}`}
        style={{ zIndex: 9999 }}
      >
        <button onClick={zoomIn} className="">
          <ZoomInIcon className="h-6 w-6" />
        </button>
        <button onClick={zoomOut} className="">
          <ZoomOutIcon className="h-6 w-6" />
        </button>
        <button onClick={home} className="">
          <HomeIcon className="h-6 w-6" />
        </button>
        <button onClick={toggleFullScreen} className="">
          <ArrowsExpandIcon className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
};

export default ImageViewer;

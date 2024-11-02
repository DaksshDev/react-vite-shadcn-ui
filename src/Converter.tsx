//NOTE: Ignore the errors they are false
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { useDropzone } from "react-dropzone";
import imageCompression from "browser-image-compression";
import { saveAs } from "file-saver";

const Converter: React.FC = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [format, setFormat] = useState<
    "jpeg" | "png" | "webp" | "ico" | "avif" | "svg" | "bmp" | "tiff" | "gif"
  >("png");
  const [message, setMessage] = useState<string>("");
  const [progress, setProgress] = useState<number>(0);
  const [isConverting, setIsConverting] = useState<boolean>(false);
  const [fileStatus, setFileStatus] = useState<Record<string, string>>({});

  const handleDrop = (acceptedFiles: File[]) => {
    setSelectedFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
    setFileStatus((prevStatus) =>
      acceptedFiles.reduce((acc, file) => {
        acc[file.name] = "Ready to convert";
        return acc;
      }, prevStatus)
    );
    setMessage("");
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);
      setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
      setFileStatus((prevStatus) =>
        files.reduce((acc, file) => {
          acc[file.name] = "Ready to convert";
          return acc;
        }, prevStatus)
      );
    }
  };

  const handleConvert = async () => {
    if (selectedFiles.length === 0) {
      setMessage("Please select or drop some image files.");
      return;
    }

    setIsConverting(true);
    setProgress(0);

    const convertPromises = selectedFiles.map(async (file, index) => {
      const fileName = file.name.split(".").slice(0, -1).join(".") || "output";
      setFileStatus((prev) => ({ ...prev, [file.name]: "Converting..." }));

      let options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
        fileType: format === "ico" || format === "svg" ? "image/png" : format,
      };

      const convertedFile = await imageCompression(file, options);

      if (format === "ico" || format === "svg") {
        const blob = new Blob([await convertedFile.arrayBuffer()], {
          type: format === "ico" ? "image/x-icon" : "image/svg+xml",
        });
        saveAs(blob, `${fileName}.${format}`);
      } else {
        saveAs(convertedFile, `${fileName}.${format}`);
      }

      setFileStatus((prev) => ({ ...prev, [file.name]: "Converted" }));
      setProgress(((index + 1) / selectedFiles.length) * 100);
    });

    try {
      await Promise.all(convertPromises);
      setMessage("All files converted and downloaded successfully!");
      setTimeout(() => {
        window.location.reload();
      }, 5000);
    } catch (error) {
      console.error("Error converting image:", error);
      setMessage("Error converting some images. Please try again.");
    } finally {
      setIsConverting(false);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
    accept: {
      "image/*": [
        ".png",
        ".jpg",
        ".jpeg",
        ".webp",
        ".svg",
        ".avif",
        ".bmp",
        ".tiff",
        ".gif",
      ],
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-background text-white p-4">
      <Navbar />
      <div className="w-full max-w-md p-6 bg-gray-800 rounded-xl shadow-md shadow-blue-500">
        <div
          {...getRootProps()}
          className={`mb-4 p-4 border-2 border-dashed rounded-lg ${isDragActive ? "border-blue-500 bg-blue-900" : "border-gray-500"}`}
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <p className="text-center text-blue-300">Drop files here...</p>
          ) : (
            <p className="text-center text-gray-300">
              Drag and drop files here, or click to select files
            </p>
          )}
        </div>

        <input
          hidden
          type="file"
          multiple
          onChange={handleFileSelect}
          className="mb-4"
        />

        <select
          title="Format"
          value={format}
          onChange={(e) => setFormat(e.target.value as typeof format)}
          className="mb-4 w-full p-2 rounded-md bg-gray-700 text-white"
        >
          <option value="png">PNG</option>
          <option value="jpeg">JPEG</option>
          <option value="webp">WEBP</option>
          <option value="ico">ICO</option>
          <option value="avif">AVIF</option>
          <option value="bmp">BMP</option>
          <option value="tiff">TIFF</option>
          <option value="gif">GIF</option>
        </select>

        <Button
          onClick={handleConvert}
          className="w-full mb-4"
          disabled={isConverting}
        >
          {isConverting ? "Converting..." : "Convert"}
        </Button>

        {isConverting && (
          <div className="w-full bg-gray-700 rounded-full h-4 mb-4">
            <div
              className="bg-blue-500 h-4 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}

        <ul className="mb-4">
          {selectedFiles.map((file) => (
            <li key={file.name} className="text-gray-300">
              {file.name} — {fileStatus[file.name] || "Ready to convert"}
            </li>
          ))}
        </ul>

        {message && <div className="text-blue-500">{message}</div>}
      </div>
    </div>
  );
};

export default Converter;

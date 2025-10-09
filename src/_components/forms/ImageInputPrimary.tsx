import React, { useState, useRef } from 'react';
import { Upload, X, ImageIcon } from 'lucide-react';




interface ImageInputPrimaryInterface {
  onImageChange: (file: File | null) => void;
  maxSize?: number; // in bytes
  acceptedFormats?: string[];
  image: string,
  label?: string,
}

export default function ImageInputPrimary({ 
        label="Image",
        image,
        onImageChange, 
        maxSize = 5 * 1024 * 1024, // 5MB default
        acceptedFormats = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
    }: ImageInputPrimaryInterface
) {
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [imagePreview, setImagePreview] = useState<string | null>(image);
  const [fileName, setFileName] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File): void => {
    // Validate file type
    if (!acceptedFormats.includes(file.type)) {
      alert(`Please select a valid image file (${acceptedFormats.join(', ')})`);
      return;
    }

    // Validate file size
    if (file.size > maxSize) {
      alert(`File size must be less than ${(maxSize / (1024 * 1024)).toFixed(1)}MB`);
      return;
    }

    setFileName(file.name);
    
    // Create preview
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      if (e.target?.result) {
        setImagePreview(e.target.result as string);
      }
    };
    reader.readAsDataURL(file);

    // Call parent component's handler
    onImageChange(file);
  };

  const onButtonClick = (): void => {
    inputRef.current?.click();
  };

  const removeImage = (): void => {
    setImagePreview(null);
    setFileName('');
    if (inputRef.current) {
      inputRef.current.value = '';
    }
    onImageChange(null);
  };

  return (
    <div className="w-full">
      <label className="block font-light mb-2">
        {label}
      </label>
      
      {!imagePreview ? (
        <div
          className={`relative border-2 border-dashed rounded-lg p-6 text-center hover:bg-gray-50 transition-colors cursor-pointer ${
            dragActive 
              ? 'border-blue-400 bg-blue-50' 
              : 'border-gray-300'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={onButtonClick}
        >
          <input
            ref={inputRef}
            type="file"
            className="hidden"
            accept={acceptedFormats.join(',')}
            onChange={handleChange}
          />
          
          <div className="flex flex-col items-center space-y-3">
            <div className={`p-3 rounded-full ${dragActive ? 'bg-blue-100' : 'bg-gray-100'}`}>
              <Upload className={`w-6 h-6 ${dragActive ? 'text-blue-500' : 'text-gray-400'}`} />
            </div>
            
            <div>
              <p className="text-sm font-medium text-gray-900">
                Click to upload or drag and drop
              </p>
              <p className="text-xs text-gray-500 mt-1">
                PNG, JPG, GIF up to {(maxSize / (1024 * 1024)).toFixed(1)}MB
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative">
          <div className="relative group rounded-lg overflow-hidden border border-gray-200">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-full h-48 object-cover"
            />
            
            {/* Overlay with actions */}
            <div className="absolute inset-0 bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-3">
              <button
                type="button"
                onClick={onButtonClick}
                className="bg-white text-gray-700 px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors flex items-center space-x-2"
              >
                <ImageIcon className="w-4 h-4" />
                <span>Change</span>
              </button>
              
              <button
                type="button"
                onClick={removeImage}
                className="bg-red-500 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-red-600 transition-colors flex items-center space-x-2"
              >
                <X className="w-4 h-4" />
                <span>Remove</span>
              </button>
            </div>
          </div>
          
          {/* File name */}
          <p className="text-sm text-gray-600 mt-2 truncate">
            {fileName}
          </p>
          
          {/* Hidden input for changing image */}
          <input
            ref={inputRef}
            type="file"
            className="hidden"
            accept={acceptedFormats.join(',')}
            onChange={handleChange}
          />
        </div>
      )}
    </div>
  );
};





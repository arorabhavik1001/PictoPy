import { imagesEndpoints } from '../apiEndpoints';
import { convertFileSrc } from '@tauri-apps/api/core';
import { APIResponse, Image } from '../../src/types/image';

export const fetchAllImages = async () => {
  const response = await fetch(imagesEndpoints.allImages, {
    headers: {
      accept: 'application/json',
    },
  });

  const data: APIResponse = await response.json();
  return data;
};

export const delMultipleImages = async (paths: string[]) => {
  const response = await fetch(imagesEndpoints.deleteMultipleImages, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ paths }),
  });

  const data: APIResponse = await response.json();
  return data;
};

const parseAndSortImageData = (data: APIResponse['data']): Image[] => {
  const parsedImages: Image[] = Object.entries(data).map(([src, tags]) => {
    const srcc = convertFileSrc(src);
    return {
      title: src.substring(src.lastIndexOf('\\') + 1),

      src: srcc,
      tags: tags,
    };
  });

  return parsedImages;
};

export const getAllImageObjects = async () => {
  const response = await fetch(imagesEndpoints.allImageObjects);
  const data: APIResponse = await response.json();
  const parsedAndSortedImages = parseAndSortImageData(data.data);
  const newObj = {
    data: parsedAndSortedImages,
    success: data.success,
    error: data.error,
  };

  return newObj;
};

export const addFolder = async (folderPath: string) => {
  const response = await fetch(imagesEndpoints.addFolder, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ folder_path: folderPath }),
  });

  const data: APIResponse = await response.json();
  return data;
};

export const addMultImages = async (paths: string[]) => {
  const response = await fetch(imagesEndpoints.addMultipleImages, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ paths }),
  });

  const data = await response.json();
  return data;
};

import { handleErrorResponse } from 'app/api/_utils/errorHandler';
import { squaredEuclidean } from 'ml-distance-euclidean';
import { kmeans } from 'ml-kmeans';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { createClient } from 'utils/supabase/server';

export type InitializationMethod = 'kmeans++' | 'random' | 'mostDistant';

export async function GET(request: Request) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const url = new URL(request.url);
  const categoriesStr = url.searchParams.get('category');
  const categories = categoriesStr ? categoriesStr.split(',') : [];
  const latitude = url.searchParams.get('latitude');
  const longitude = url.searchParams.get('longitude');
  const latitudeDelta = url.searchParams.get('latitudeDelta');
  const longitudeDelta = url.searchParams.get('longitudeDelta');

  const northEastBoundary = {
    latitude: Number(latitude) + Number(latitudeDelta),
    longitude: Number(longitude) + Number(longitudeDelta),
  };

  const southWestBoundary = {
    latitude: Number(latitude) - Number(latitudeDelta),
    longitude: Number(longitude) - Number(longitudeDelta),
  };

  const isLatitudeWithinBounds = ({ x_code }: { x_code: number }) => {
    return (
      x_code > southWestBoundary.latitude && x_code < northEastBoundary.latitude
    );
  };

  const isLongitudeWithinBounds = ({ y_code }: { y_code: number }) => {
    return (
      y_code > southWestBoundary.longitude &&
      y_code < northEastBoundary.longitude
    );
  };

  try {
    const { data, error } = await supabase
      .from('traffic_hub')
      .select('*')
      .or(categories.map((category) => `source.eq.${category}`).join(','));

    if (error) {
      throw new Error(error.message);
    }

    const foundMarker = data.filter(
      (marker) =>
        isLatitudeWithinBounds({ x_code: marker.x_code }) &&
        isLongitudeWithinBounds({ y_code: marker.y_code }),
    );

    const defaultOptions = {
      maxIterations: 100,
      tolerance: 1e-6,
      initialization: 'kmeans++' as InitializationMethod,
      distanceFunction: squaredEuclidean,
    };

    const k = 10;
    const points = foundMarker.map((marker) => [marker.x_code, marker.y_code]);
    const result = kmeans(points, k, defaultOptions);

    const clusters = result.centroids.map((centroid, index) => ({
      id: Math.random(),
      latitude: centroid[0],
      longitude: centroid[1],
      count: result.clusters.filter((c) => c === index).length,
    }));

    return new NextResponse(JSON.stringify(clusters), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return handleErrorResponse(error);
  }
}

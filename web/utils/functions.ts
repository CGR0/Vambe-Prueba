import { getMeetings } from '../services/meetings';
import {
  BusinessLine,
  BusinessStage,
  DailyConsultations,
  HowCameToVambe,
} from './enums';
import { Filters, Meeting } from './types';

export const getOriginalData = async () => {
  const meetings = await getMeetings('transcription,client,seller');
  return { meetings };
};

export const getLength = (
  data: Meeting[],
  type: 'client' | 'seller' | 'closed',
) => {
  if (type === 'closed') {
    return data.filter((meeting) => meeting.closed).length;
  }
  return [...new Set(data.map((meeting) => meeting[type]?.id))].length;
};

export const getChartData = (
  meetings: Meeting[],
  type:
    | 'seller'
    | 'business_stage'
    | 'business_line'
    | 'date'
    | 'daily_consultations'
    | 'how_came_to_vambe',
) => {
  let data: Record<string, number> = {};
  if (type === 'seller') {
    data = reduceSellers(meetings);
  } else if (type === 'business_stage') {
    data = reduceData(meetings, 'business_stage');
  } else if (type === 'business_line') {
    data = reduceData(meetings, 'business_line');
  } else if (type === 'date') {
    data = reduceDateData(meetings);
  } else if (type === 'daily_consultations') {
    data = reduceData(meetings, 'daily_consultations');
  } else if (type === 'how_came_to_vambe') {
    data = reduceData(meetings, 'how_came_to_vambe');
  }
  return parseChartData(data);
};

const reduceSellers = (meetings: Meeting[]) => {
  const data = meetings.reduce((acc, meeting) => {
    acc[meeting.seller.name] = (acc[meeting.seller.name] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  return sortData(data);
};

const reduceData = (
  meetings: Meeting[],
  type:
    | 'business_stage'
    | 'business_line'
    | 'daily_consultations'
    | 'how_came_to_vambe',
): Record<string, number> => {
  const data = meetings.reduce((acc, meeting) => {
    const attribute = meeting.transcription[type];
    if (
      Object.values(
        type === 'business_stage'
          ? BusinessStage
          : type === 'daily_consultations'
          ? DailyConsultations
          : type === 'how_came_to_vambe'
          ? HowCameToVambe
          : BusinessLine,
      ).includes(
        attribute as
          | BusinessStage
          | BusinessLine
          | DailyConsultations
          | HowCameToVambe,
      )
    ) {
      const key = attribute as string;
      acc[key] = (acc[key] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);
  return sortData(data);
};

const reduceDateData = (meetings: Meeting[]): Record<string, number> => {
  const data = meetings.reduce((acc, meeting) => {
    const date = new Date(meeting.date);
    const month = date.getMonth();
    const year = date.getFullYear();
    const day = date.getDay();
    const key = `${year}-${month + 1}-${day}`;
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  return sortDateData(data);
};

const parseChartData = (
  data: Record<string, number>,
): { x: string; y: number }[] => {
  return Object.entries(data).map(([key, value]) => ({
    x: key,
    y: value,
  }));
};

const sortData = (data: Record<string, number>) => {
  return Object.fromEntries(
    Object.entries(data).sort((a, b) => b[1] - a[1]),
  ) as Record<string, number>;
};

const sortDateData = (data: Record<string, number>): Record<string, number> => {
  const sortedMonths = Object.fromEntries(
    Object.entries(data).sort((a, b) => {
      const [keyA, valueA] = a;
      const [keyB, valueB] = b;

      const dateA = Number(keyA.split('-')[1]);
      const dateB = Number(keyB.split('-')[1]);

      return dateA - dateB;
    }),
  );
  return sortedMonths;
};

export const accumulateData = (
  data: { x: string; y: number }[],
): { x: string; y: number }[] => {
  for (let i = 0; i < data.length; i++) {
    if (i > 0) {
      data[i].y += data[i - 1].y;
    }
  }
  return data;
};

export const filterMeetings = (meetings: Meeting[], filters: Filters) => {
  let filteredMeetings = meetings;
  if (filters.sales.length > 0) {
    filteredMeetings = filterBySales(filteredMeetings, filters.sales);
  }
  if (filters.clientsIds.length > 0) {
    filteredMeetings = filterByIds(
      filteredMeetings,
      filters.clientsIds,
      'client',
    );
  }
  if (filters.sellersIds.length > 0) {
    filteredMeetings = filterByIds(
      filteredMeetings,
      filters.sellersIds,
      'seller',
    );
  }
  if (filters.businessLines.length > 0) {
    filteredMeetings = filterByTranscription(
      filteredMeetings,
      filters.businessLines,
      'business_line',
    );
  }
  if (filters.businessStages.length > 0) {
    filteredMeetings = filterByTranscription(
      filteredMeetings,
      filters.businessStages,
      'business_stage',
    );
  }
  if (filters.dailyConsultations.length > 0) {
    filteredMeetings = filterByTranscription(
      filteredMeetings,
      filters.dailyConsultations,
      'daily_consultations',
    );
  }
  if (filters.howCameToVambe.length > 0) {
    filteredMeetings = filterByTranscription(
      filteredMeetings,
      filters.howCameToVambe,
      'how_came_to_vambe',
    );
  }
  if (filters.search.length > 0) {
    filteredMeetings = filterBySearch(filteredMeetings, filters.search);
  }
  return filteredMeetings;
};

const filterBySales = (meetings: Meeting[], values: string[]) => {
  if (values.includes('true')) {
    return meetings.filter((item) => item.closed);
  } else if (values.includes('false')) {
    return meetings.filter((item) => !item.closed);
  }
  return meetings;
};

const filterByIds = (
  meetings: Meeting[],
  ids: string[],
  type: 'client' | 'seller',
) => {
  return meetings.filter((item) => ids.includes(item[type].id));
};

const filterByTranscription = (
  meetings: Meeting[],
  values: string[],
  type:
    | 'business_line'
    | 'business_stage'
    | 'daily_consultations'
    | 'how_came_to_vambe',
) => {
  return meetings.filter(
    (item) =>
      item.transcription[type] && values.includes(item.transcription[type]),
  );
};

const filterBySearch = (meetings: Meeting[], search: string) => {
  return meetings.filter(
    (item) =>
      item.client.name.toLowerCase().includes(search.toLowerCase()) ||
      item.client.email.toLowerCase().includes(search.toLowerCase()) ||
      item.client.phone.toLowerCase().includes(search.toLowerCase()) ||
      item.seller.name.toLowerCase().includes(search.toLowerCase()) ||
      item.date.toString().split('T')[0].includes(search),
  );
};

export const getOptions = (meetings: Meeting[], type: 'client' | 'seller') => {
  return [
    ...new Set(meetings.map((item) => `${item[type].name} - ${item[type].id}`)),
  ].map((result) => ({
    title: result.split(' - ')[0],
    value: result.split(' - ')[1],
  }));
};

export const getScatterData = (
  meetings: Meeting[],
  type: 'business_line' | 'business_stage' | 'how_came_to_vambe',
) => {
  const separatedData = Object.values(
    type === 'business_stage'
      ? BusinessStage
      : type === 'how_came_to_vambe'
      ? HowCameToVambe
      : BusinessLine,
  ).map((item) => {
    return {
      x: item,
      y: meetings.filter((meeting) => meeting.transcription[type] === item),
    };
  });
  const finalData = separatedData.map((item) => {
    return {
      label: item.x,
      data: Object.values(DailyConsultations)
        .map((consultation) => ({
          x: consultation,
          y:
            item.y
              .filter(
                (meeting) =>
                  meeting.transcription.daily_consultations === consultation,
              )
              .filter((meeting) => meeting.closed).length /
            item.y.filter(
              (meeting) =>
                meeting.transcription.daily_consultations === consultation,
            ).length,
        }))
        .filter((item) => item.y && item.y !== 0),
      id: item.x,
    };
  });
  return finalData;
};

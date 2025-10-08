import React, { useState, useEffect, useRef, useCallback, ReactNode } from 'react';
import notesService from '@/services/notesService';
import FormatDate from '@/components/ui/format-date';

const timelineStyles = `
.timeline {
  position: relative;
  margin: 0 auto;
}

.timeline::before {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  width: 2px;
  background-color: #ccc;
  margin-left: -1px;
}

.timeline li {
  list-style: none;
  position: relative;
  margin: 20px 0;
}

.timeline li:nth-child(odd) {
  float: left;
  clear: right;
  margin-right: -30px;
}

.timeline li:nth-child(even) {
  float: right;
  clear: left;
  margin-left: -30px;
}


.timeline-panel {
  width: 85%;
  margin-bottom: 2rem;
  padding: 20px;
  background-color: white;
  border: 1px solid #d4d4d4;
  border-radius: 5px;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.12), 0 1px 4px rgba(0, 0, 0, 0.24);
}

.timeline-panel:before {
  position: absolute;
  top: 12px;
  width: 0;
  height: 0;
  border-style: solid;
}

.timeline li:nth-child(odd) .timeline-panel {
  float: right;
}

.timeline li:nth-child(odd) .timeline-panel:before {
  left: -15px;
  border-width: 8px 16px 8px 0;
  border-color: transparent #d4d4d4 transparent transparent;
}

.timeline li:nth-child(even) .timeline-panel {
  float: left;
}

.timeline li:nth-child(even) .timeline-panel:before {
  right: -15px;
  border-width: 8px 0 8px 16px;
  border-color: transparent transparent transparent #d4d4d4;
}

.timeline-title {
  margin-top: 0;
  color: inherit;
}

.timeline-body > p,
.timeline-body > ul {
  margin-bottom: 0;
  min-width: 90%;
}

.timeline-badge.success {
  background-color: #2ecc71;
}

.timeline-badge.warning {
  background-color: #f1c40f;
}

.timeline-badge.danger {
  background-color: #e74c3c;
}

.timeline-badge.info {
  background-color: #3498db;
}
`;

interface ModalTimelineProps {
  isOpen: boolean;
  onClose: () => void;
  requestId: string;
}

interface TimelineItem {
  id_person: {
    full_name: string;
  };
  createdAt(createdAt: unknown): string | number;
  old_value: string;
  id: number;
  description: string;
  created_at: string;
}

const itemsPerPage = 10;

const ModalTimeline: React.FC<ModalTimelineProps> = ({ isOpen, onClose, requestId }) => {
  const [timelineItems, setTimelineItems] = useState<TimelineItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [page, setPage] = useState(1);
  const timelineRef = useRef<HTMLDivElement>(null);

  const fetchTimelineItems = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await notesService.getRequestNotes('request', requestId, page, itemsPerPage);

      if (data.data && data.data.length > 0) {
        setTimelineItems((prevItems) => [...prevItems, ...data.data]);
        setPage((prevPage) => prevPage + 1);
      }
      if(parseInt(data.pagination.page) < parseInt(data.pagination.last_page)){
        setHasMore(true);
      }else{
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching timeline items:", error);
      setHasMore(false);
    } finally {
      setIsLoading(false);
    }
  }, [requestId, page]);

  useEffect(() => {
    const timelineElement = timelineRef.current;
    if (!timelineElement) return;

    const loadInitialData = async () => {
      setTimelineItems([]);
      setPage(1);
      setHasMore(true);
      setIsLoading(true);
      try {
        const data = await notesService.getRequestNotes('request', requestId, 1, itemsPerPage);
        if (data.data && data.data.length > 0) {
          setTimelineItems(data.data);
          setPage(2);
          if(data.pagination.page < data.pagination.last_page){
            setHasMore(true);
          }else{
            setHasMore(false);
          }
        } else {
          setHasMore(false);
        }
      } catch (error) {
        console.error("Error fetching timeline items:", error);
        setHasMore(false);
      } finally {
        setIsLoading(false);
      }
    };

    loadInitialData();

    const handleScroll = () => {
      if (isLoading || !hasMore) return;

      const isAtBottom =
        timelineElement.scrollHeight - timelineElement.scrollTop <= timelineElement.clientHeight + 50;

      if (isAtBottom) {
        fetchTimelineItems();
      }
    };

    timelineElement.addEventListener('scroll', handleScroll);

    return () => {
      timelineElement.removeEventListener('scroll', handleScroll);
    };
  }, [requestId, fetchTimelineItems, hasMore, isLoading]);

  
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <style>{timelineStyles}</style>
      <div className="bg-white rounded-lg shadow-lg w-4/5 max-w-2xl">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">Timeline</h2>
          <button onClick={onClose} className="px-2 py-1 rounded hover:bg-gray-200">
            X
          </button>
        </div>
        <div className="p-4 overflow-y-auto" style={{ maxHeight: '600px' }} ref={timelineRef}>
          {/* Timeline content will go here */}
            {timelineItems.map((item, index) => {
              const formattedDate = FormatDate(String(item.createdAt), 'dd/mm/yyyy às hh:mm:ss')

              return (
                <p key={index}>
                  <div className="timeline-panel">
                    <div className="timeline-heading">
                      <h4 className="timeline-title">
                        {item.id_person.full_name} em {formattedDate}:
                      </h4>
                    </div>
                    <div className="timeline-body">
                      <p>{item.description}</p>
                    </div>
                  </div>
                </p>
              );
            })}

            {isLoading && <p>Carregando...</p>}
            {!hasMore && <p>Fim da timeline</p>}
        </div>
      </div>
    </div>
  );
};

export default ModalTimeline;
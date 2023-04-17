import throttle from "lodash.throttle";
import {
  PropsWithChildren,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { css } from "utils";
import GreyLogo from "../Icon/CustomIcons/GreyLogo";
import { Spinner } from "../Spinner/Spinner";
import { Text, TextIntent, TextSize } from "../Text/Text";

export interface InfinteScrollProps {
  next: () => any;
  hasMore: boolean;
  dataLength: number;
  height?: number;
  renderEndData?: () => ReactNode;
  renderLoader?: () => ReactNode;
  endDataMessage?: string;
}

export const InfiniteScroll: React.FC<
  PropsWithChildren<InfinteScrollProps>
> = ({
  children,
  next,
  hasMore,
  dataLength,
  renderEndData,
  height,
  renderLoader,
  endDataMessage,
}) => {
  const [showLoader, setShowLoader] = useState(true);
  const [actionTriggered, setActionTriggered] = useState(false);
  const infiniteScrollRef = useRef<HTMLDivElement | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const handleObserver = useCallback(
    (entries: any) => {
      const [target] = entries;
      const query = throttle(() => {
        setActionTriggered(true);
        setShowLoader(true);
        next();
      }, 500);

      if (target.isIntersecting && !actionTriggered && hasMore) {
        query();
      }
    },
    [actionTriggered, hasMore]
  );

  useEffect(() => {
    const root = height ? infiniteScrollRef.current : null;
    const options = {
      root,
      threshold: 0,
      rootMargin: "600px",
    };
    const observer = new IntersectionObserver(handleObserver, options);
    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }
    return () => {
      observer.disconnect();
    };
  }, [handleObserver, actionTriggered, height]);

  // reset actionTriggered on new data loaded
  const previousDataLength = useRef<typeof dataLength | null>();
  useEffect(() => {
    if (dataLength !== previousDataLength.current) {
      setActionTriggered(false);
      setShowLoader(false);
    }
  }, [dataLength]);
  useEffect(() => {
    previousDataLength.current = dataLength;
  });

  const defaultEndMessage = "-";
  return (
    <div
      ref={infiniteScrollRef}
      className={css({
        "overflow-y-scroll": height,
        "h-full": !height,
      })}
      style={{ height }}
    >
      {children}
      {showLoader && hasMore && (
        <>
          {renderLoader && renderLoader()}
          {!renderLoader && (
            <div className={css("flex", "justify-center", "mt-4")}>
              <Spinner />
            </div>
          )}
        </>
      )}
      <div ref={loadMoreRef}>
        {!hasMore && dataLength > 0 && (
          <div
            className={css(
              "text-sm",
              "text-neutral-600",
              "text-center",
              "mt-14"
            )}
          >
            {renderEndData ? (
              renderEndData()
            ) : (
              <Text intent={TextIntent.Gray} size={TextSize.Sm}>
                {endDataMessage || <DefaultEnd />}
              </Text>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const DefaultEnd = () => {
  return (
    <div className={css("flex", "justify-center")}>
      <GreyLogo size={14} />
    </div>
  );
};

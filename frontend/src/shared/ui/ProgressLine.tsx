/** Прогресс-линия
 *
 * @param progress - в процентах от 0 до 100
 * @constructor
 */
export const ProgressLine = ({ progress }: { progress: number }) => (
  <div className={"flex items-center gap-2"}>
    <div
      role="progressbar"
      className="flex w-full h-1 bg-text-primary/20 rounded-full"
      aria-label={`Прогресс: ${progress}%`}>
      <span
        aria-hidden="true"
        className="bg-primary rounded-full"
        style={{
          width: `${progress}%`
        }}
      />
    </div>
    <span className="text-sm text-text-primary/50">{progress}%</span>
  </div>
);

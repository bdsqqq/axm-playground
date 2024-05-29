export const InputOverlayHintingShowcase = () => {
  return (
    <section className="flex flex-col gap-4">
      <h2>
        Loading Strategy:
        <pre className="text-sm text-gray-11">{`minimum artificial delays
  - minimumDuration: shows spinner for at least 500ms
  - delay: don't show spinner if response is less than 100ms
  - immediate: normal behavior`}</pre>
      </h2>
    </section>
  );
};

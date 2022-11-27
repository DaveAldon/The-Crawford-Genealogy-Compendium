import SlidingPaneLibrary from 'react-sliding-pane';

interface SlidingPaneProps {
  isOpen: boolean;
  activeNode: string;
  setPanelState: (state: boolean) => void;
}
export const SlidingPane = (props: SlidingPaneProps) => {
  const { isOpen, activeNode, setPanelState } = props;
  return (
    <SlidingPaneLibrary
      className="slide-pane"
      closeIcon={<div>Some div containing custom close icon.</div>}
      isOpen={isOpen}
      width="400px"
      title="Hey, it is optional pane title.  I can be React component too."
      onRequestClose={() => setPanelState(false)}>
      <div>
        <p>{activeNode}</p>
      </div>
    </SlidingPaneLibrary>
  );
};

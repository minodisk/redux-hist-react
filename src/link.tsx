import * as React from "react";
import {connect} from "react-redux";
import {Dispatch} from "redux";
import * as hist from "redux-hist";

export interface AnchorProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  push?: (pathname: string) => void;
}

class AnchorBase extends React.Component<AnchorProps, {}> {
  public render() {
    const {
      push,
      onClick,
      ...props,
    } = this.props;
    return (
      <a
        onClick={(onClick != null) ? onClick : this.onClick}
        {...props}
      >{this.props.children}</a>
    );
  }

  private onClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (
      this.props.target ||
      e.defaultPrevented ||
      e.button > 0 ||
      e.altKey ||
      e.ctrlKey ||
      e.shiftKey ||
      e.metaKey
    ) {
      return;
    }

    e.preventDefault();
    this.props.push(this.props.href);
  }
}

export const Anchor = connect<void, {}, AnchorProps>(
  null,
  (dispatch: Dispatch<any>, props: AnchorProps): any => {
    return {
      push: (pathname: string) => dispatch(hist.push(pathname)),
    };
  },
)(AnchorBase);

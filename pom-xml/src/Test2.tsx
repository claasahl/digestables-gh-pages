import * as React from "react";

import * as FileSaver from "file-saver";
import * as JSZip from "jszip";

class Test2 extends React.Component {
  public render() {
    return (
      <button type="button" className="btn btn-light" onClick={this.onClick}>
        Generate ZIP file
      </button>
    );
  }

  private onClick = () => {
    const zip = new JSZip();
    zip.file("Hello.txt", "Hello World\n");
    zip.generateAsync({ type: "blob" }).then(content => {
      FileSaver.saveAs(content, "example.zip");
    });
  };
}

export default Test2;

figma.showUI(__html__);

figma.ui.resize(200, 420);

figma.ui.onmessage = async (pluginMessage) => {
  if (pluginMessage.type === 'change-text') {

    const minValue = pluginMessage.valuemin;
    const maxValue = pluginMessage.valuemax;
    const prefix = pluginMessage.prefix;
    const suffix = pluginMessage.suffix;

    const selectedNodes = figma.currentPage.selection;

    if (isNaN(minValue) || isNaN(maxValue) || minValue >= maxValue) {
      figma.notify("Please enter valid min and max values with min < max.");
      return;
    }

    if (selectedNodes.length > 0) {
      let anyTextNodes = false;

      for (const node of selectedNodes) {
        if (node.type === 'TEXT') {
          anyTextNodes = true;
          const textNode = node as TextNode;
          await figma.loadFontAsync(textNode.fontName as FontName);

          const numberRandom1 = (Math.floor(Math.random() * (maxValue - minValue + 1) + minValue)).toString();
          const numberRandom2 = (Math.random() * (maxValue - minValue) + minValue).toFixed(2).replace('.', ',');

          let selectedRandom;

          switch (pluginMessage.changeGroup) {
            case "2":
              selectedRandom = numberRandom2;
              break;
            default:
              selectedRandom = numberRandom1;
              break;
          }

          textNode.characters = `${prefix}${selectedRandom}${suffix}`;

        }
      }

      if (anyTextNodes) {
        figma.notify("Text changed to random number! for selected text nodes.");
      }
      else {
        figma.notify("No text nodes selected. Please select at least one text node.");
      }

    }
    else {
      figma.notify("Please select at least one text node.");
    }

  }
}


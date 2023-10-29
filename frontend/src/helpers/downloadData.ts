export const downloadBinaryStringAsFile = (binaryString: string, fileName: string) => {
  // Convert the binary string to a Blob
  const blob = new Blob([binaryString], { type: 'application/octet-stream' });

  // Create a URL for the Blob
  const url = URL.createObjectURL(blob);

  // Create a temporary anchor element to trigger the download
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;

  // Programmatically click the anchor to trigger the download
  a.click();

  // Clean up by revoking the Object URL
  URL.revokeObjectURL(url);
};

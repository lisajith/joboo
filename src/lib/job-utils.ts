export function formatSalary(
  min: number,
  max: number,
  period: "year" | "month",
) {
  if (period === "month") {
    if (min === max) {
      return `₹${min.toLocaleString("en-IN")}/month`;
    }

    return `₹${min.toLocaleString("en-IN")}–₹${max.toLocaleString(
      "en-IN",
    )}/month`;
  }

  const minLpa = min / 100000;
  const maxLpa = max / 100000;

  if (min === max) {
    return `₹${minLpa} LPA`;
  }

  return `₹${minLpa}–${maxLpa} LPA`;
}

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function formatPostedTime(date: string) {
  const postedDate = new Date(date);
  const today = new Date();

  const difference = today.getTime() - postedDate.getTime();
  const days = Math.floor(difference / (1000 * 60 * 60 * 24));

  if (days <= 0) {
    return "Today";
  }

  if (days === 1) {
    return "1 day ago";
  }

  if (days < 7) {
    return `${days} days ago`;
  }

  const weeks = Math.floor(days / 7);

  if (weeks === 1) {
    return "1 week ago";
  }

  return `${weeks} weeks ago`;
}
